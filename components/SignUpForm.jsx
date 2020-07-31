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
        this.setState({ ...initialState, formSubmited: true });
        alert(`Welcome, ${data.get("username")}!`);
    }

    render() {
        const { username, password, doubleCheck } = this.state;
        const validPassword = password.value !== doubleCheck.value;
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
                    className={`${
                        username.isDirty &&
                        doubleCheck.isDirty &&
                        validPassword &&
                        "border-red-500"
                    }`}
                    onChange={this.handleChange}
                />
                {password.isDirty && (
                    <Input
                        required
                        id={doubleCheck.name}
                        value={doubleCheck.value}
                        placeholder={doubleCheck.placeholder}
                        name={doubleCheck.name}
                        type="password"
                        className={`${
                            username.isDirty &&
                            doubleCheck.isDirty &&
                            validPassword &&
                            "border-red-500"
                        }`}
                        onChange={this.handleChange}
                    />
                )}

                {password.isDirty && doubleCheck.isDirty && validPassword && (
                    <div className="text-red-500">Passwords do not match</div>
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
