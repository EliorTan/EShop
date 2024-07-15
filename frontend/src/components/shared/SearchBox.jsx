import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/button"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getFilterUrl } from "../../utils"

const SearchBox = () => {

    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const {search} = useLocation();

    useEffect(() => {

        //getFilterUrl(search)

        if (!query) {
            return
        }
        const filterURI = getFilterUrl(search, {query: query});
        navigate(filterURI);

        // eslint-disable-next-line
    },[ query])
    
    const submitHandler = (e) => {
        e.preventDefault();
        if (query) {
            navigate(`/search?q=${query}`);
        } else {
            navigate('/');
        }
    }
    
    
  return (
    <>
        <Form onSubmit={(e) => submitHandler(e)} className="d-flex me-auto w-50">
            <InputGroup>
                <FormControl
                    aria-describedby="button-search"
                    type="text"
                    placeholder="Search for products"
                    name="q"
                    id="q"
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button variant="outline-primary" type="submit" id="button-search">
                    <i className="fa fa-search"></i>
                </Button>
            </InputGroup>
        </Form>
    </>
  )
}

export default SearchBox