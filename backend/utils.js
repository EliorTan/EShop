import jwt from 'jsonwebtoken'


const generateToken = ({_id,name,email}) => {
    return jwt.sign({
        _id: _id,
        name: name,
        email: email,
    }, process.env.JWT_PW ,{
        expiresIn: process.env.JWT_EXPIRATION,
    })
}

const isAuth = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        if (auth) {
            const token = auth.split(' ')[1];
        jwt.verify(token, process.env.JWT_PW, (err, decode) => {
            if (err) {
                res.status(401).send({message: 'Invalid or Expired Token'});
            } else {
                req.user = decode;
                next();
            }
        })} else {
            res.status(401).send({message: 'No Token Provided'});
        }
    } catch (error) {
        res.status(500).send({message: 'Invalid or Expired Token / server error: ' + error.message});
    }
}

export {generateToken, isAuth}