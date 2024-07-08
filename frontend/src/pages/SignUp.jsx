import { useContext,useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Title from "../components/shared/Title";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { Store } from "../store";
import { USER_SIGNIN } from "../actions";
import { useLocation } from "react-router-dom";


const SignUp = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const {search} = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const navigate = useNavigate();
    const {state, dispatch: ctxDispatch} = useContext(Store)
    const {userInfo} = state;

    useEffect(() => {
        if(userInfo){
            navigate(redirect);
        }
    },[userInfo,navigate,redirect]);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const{data} = await axios.post('/api/v1/users/signup',{name,email,password});

            ctxDispatch({
                type: USER_SIGNIN,
                payload: data
            });


            localStorage.setItem('userInfo',JSON.stringify(data));
            navigate('/');
        } catch(e)
        {
            toast.error(getError(e))
            console.log(e.message);
        }
    }

    return (
    <Container className="small-container">
        <Title title='Sign-Up'/>
        <h1 className="my-3">Sign Up</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name: </Form.Label>
                <Form.Control type="text" required onChange={(e)=>setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email: </Form.Label>
                <Form.Control type="email" required onChange={(e)=>setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password" required onChange={(e)=>setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password: </Form.Label>
                <Form.Control type="password" required onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <div className="mb-3">
                <Button type="submit" disabled={password !== confirmPassword}>Sign Up</Button>
                {password !== confirmPassword
                ? <div className="text-danger">Passwords do not match</div>
              : <div className="text-success">Passwords match</div>}
            </div>

            <div className="mb-3">
                Already have an account? {" "}<Link to={`/signin?redirect=${redirect}`}>Sign-In here</Link>
            </div>

        </Form>
    </Container>
  )
}

export default SignUp