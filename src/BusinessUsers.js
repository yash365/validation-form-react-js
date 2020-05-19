import React from "react";
import Dropdown from "./DropDown";

const initialState = {
    name: "",
    mobileNumber: "",
    pincode: "",
    email: "",
    nameError: "",
    mobileNumberError: "",
    pincodeError: "",
    emailError: "",
    region: '',
    State: '',
};

export default class BusinessUsers extends React.Component {
    state = initialState;

    selectState(val) {
        this.setState({ State: val });
    }

    selectRegion(val) {
        this.setState({ region: val });
    }


    handleChange = event => {
        const isCheckbox = event.target.type === "checkbox";
        this.setState({
            [event.target.name]: isCheckbox
                ? event.target.checked
                : event.target.value
        });
        //const mobileNumber = value.slice(0, maxLength)
    };

    validate = () => {
        let nameError = "";
        let mobileNumberError = "";
        let pincodeError = "";
        let emailError = "";

        let regexAlphabets = /^[A-Za-z]+$/;
        let regexIndianNumbers = /^[6-9]\d{9}$/;
        let regexNumbers = /^[0-9]*$/;
        let regexPincodes = /^[1-9][0-9]{5}$/;
        let regexEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

        console.log(this.state.name);
        console.log(this.state.mobileNumber);
        console.log(this.state.pincode);
        console.log(this.state.email);

        // name validation
        if (!this.state.name) {
            nameError = "Name cannot be blank";
        }
        else if (!regexAlphabets.test(this.state.name)) {
            nameError = "Name should contain only alphabets";
            console.log("inside nameError");
        }
        else if (this.state.name.length < 3) {
            nameError = "Name cannot be less than 3 characters";
        }

        // mobile number validation
        if (!this.state.mobileNumber) {
            mobileNumberError = "Mobile Number cannot be blank";
        }
        else if (this.state.mobileNumber.length < 10) {
            mobileNumberError = "Mobile Number cannot be less 10 digits";
        }
        else if (!regexNumbers.test(this.state.mobileNumber)) {
            mobileNumberError = "Mobile Number should contain only digits";
            console.log("inside mobileNumberError")
        }
        else if (!regexIndianNumbers.test(this.state.mobileNumber)) {
            mobileNumberError = "Invalid Mobile Number";
            console.log("inside mobileNumberError")
        }

        // pincode validation
        if (!this.state.pincode) {
            pincodeError = "Pincode cannot be blank";
        }
        else if (!regexPincodes.test(this.state.pincode)) {
            pincodeError = "Please enter your correct 6 digit pincode";
            console.log("inside pincodeError")
        }
        else if (this.state.pincode.length < 6) {
            pincodeError = "Pincode cannot be less 6 digits";
        }

        // email validation
        if (!this.state.email) {
            emailError = "Email cannot be blank";
        }
        else if (!regexEmail.test(this.state.email)) {
            emailError = "Invalid email"
        }

        if (nameError || mobileNumberError || pincodeError || emailError) {
            this.setState({ nameError, mobileNumberError, pincodeError, emailError });
            return false;
        }

        return true;
    };

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
            // clear form
            this.setState(initialState);
        }
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                {/* name field */}
                <div>
                    <input
                        style={{ fontSize: 14, color: "black" }}
                        type="text"
                        inputMode="text"
                        maxLength="30"
                        //minLength="3"
                        name="name"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.nameError}
                    </div>
                </div>

                {/* mobile number field */}
                <div>
                    <input
                        style={{ fontSize: 14, color: "black" }}
                        inputMode="numeric"
                        maxLength="10"
                        //minLength="10"
                        name="mobileNumber"
                        placeholder="Mobile Number"
                        type="number"
                        value={this.state.mobileNumber}
                        // on input needs to be added for minimising max length
                        onInput={(e) => {
                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                        }}
                        onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.mobileNumberError}
                    </div>
                </div>

                {/* pincode number field */}
                <div>
                    <input
                        style={{ fontSize: 14, color: "black" }}
                        maxLength="6"
                        inputMode="numeric"
                        //minLength="6"
                        name="pincode"
                        placeholder="Pincode"
                        type="number"
                        value={this.state.pincode}
                        // on input needs to be added for minimising max length
                        onInput={(e) => {
                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
                        }}
                        onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.pincodeError}
                    </div>
                </div>

                {/* email number field */}
                <div>
                    <input
                        style={{ fontSize: 14, color: "black" }}
                        inputMode="email"
                        //minLength="6"
                        name="email"
                        placeholder="Email"
                        type="text"
                        value={this.state.email}
                        // on input needs to be added for minimising max length
                        // onInput = {(e) =>{
                        //     e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,6)
                        //   }}
                        onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.emailError}
                    </div>
                </div>

                {/* dropdown menu for country */}
                {/* <div>
                    <label style={{ fontSize: 14, color: "black" }}>
                        Countries:
                <select value={this.state.value} onChange={this.handleChange}>
                            <option value="india">India</option>
                            <option value="usa">USA</option>
                            <option value="germany">Germany</option>
                        </select>
                    </label>
                </div> */}

                <div>
                    <Dropdown/>
                </div>
                
                <button type="submit">Submit</button>
            </form>
        );
    }
}

