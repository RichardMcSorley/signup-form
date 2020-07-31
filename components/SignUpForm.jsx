import { Component } from "react";
import Input from "./Input";

const initialState = {
    username: {
        name: "username",
        value: "",
        isDirty: false,
        placeholder: "Create a Username"
    },
    password: {
        name: "password",
        value: "",
        isDirty: false,
        placeholder: "Create a Password"
    },
    doubleCheck: {
        name: "doubleCheck",
        value: "",
        isDirty: false,
        placeholder: "Verify your Password"
    },
    formSubmited: false
};

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...initialState };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const element = event.target;
        const { value, name } = element;
        this.setState({
            [name]: { ...this.state[name], value, isDirty: true }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const element = event.target;
        const data = new FormData(element);
        const { username, password, doubleCheck } = this.state;
        if (this.invalidText() !== null) return;
        if (this.isDirty([username, password, doubleCheck]) === false) return;
        this.setState({ ...initialState, formSubmited: true });
        alert(`Welcome, ${data.get("username")}!`);
    }

    isDirty(fieldArray = []) {
        for (const field of fieldArray) {
            if (field.isDirty) return true;
        }
        return false;
    }

    invalidText() {
        let reason = null;
        const { password, doubleCheck } = this.state;
        if (doubleCheck.isDirty && password.value !== doubleCheck.value)
            reason = "Passwords do not match";
        if (password.isDirty && password.value.length === 0)
            reason = "Please type a password";
        return reason;
    }

    render() {
        const { username, password, doubleCheck } = this.state;
        const invalidText = this.invalidText();
        const highlightRed =
            this.isDirty([username, password]) &&
            invalidText &&
            "border-red-500";
        return (
            <form
                className="flex flex-col items-center justify-center p-8 bg-white rounded shadow-lg"
                onSubmit={this.handleSubmit}
            >
                <Input
                    required
                    id={username.name}
                    value={username.value}
                    placeholder={username.placeholder}
                    name={username.name}
                    onChange={this.handleChange}
                />
                <Input
                    required
                    id={password.name}
                    value={password.value}
                    placeholder={password.placeholder}
                    name={password.name}
                    type="password"
                    onChange={this.handleChange}
                    className={`${highlightRed}`}
                />
                {this.isDirty([password]) && (
                    <Input
                        required
                        id={doubleCheck.name}
                        value={doubleCheck.value}
                        placeholder={doubleCheck.placeholder}
                        name={doubleCheck.name}
                        type="password"
                        onChange={this.handleChange}
                        className={`${highlightRed}`}
                    />
                )}

                {this.isDirty([username, password]) && (
                    <div className="text-red-500">{invalidText}</div>
                )}
                <button
                    className="p-2 px-4 mt-5 text-white bg-blue-500 shadow-md rounded-md"
                    type="submit"
                >
                    Sign up
                </button>
            </form>
        );
    }
}

export default SignUpForm;
