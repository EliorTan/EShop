import jwt from 'jsonwebtoken'


const generateToken = ({_id,name,email}) => {
    return jwt.sign({
        _id: _id,
        name: name,
        email: email,
    }, process.env.JWT_PW ,{
        expiresIn: '7d'
    })
}

const isAuth = (req, res, next) => {

}

export {generateToken, isAuth}