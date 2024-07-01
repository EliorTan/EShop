import bycrpt from 'bcryptjs'
import User from '../models/User.js'
import {generateToken} from '../utils.js'
const signin = async (req,res) => {

  const {email, password } = req.body;

  const user = await User.findOne({email});
  if(user){
    if (bycrpt.compareSync(password, user.password)){
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({message: 'Invalid email or password'})
}

const signup = async (req,res) => {

  const {name, email, password } = req.body;

  const newUser = new User ({
    name: name,
    email: email,
    password: bycrpt.hashSync(password)
  })
  const user = await newUser.save();
  res.send({
    _id: user._id,
    name: newUser.name,
    email: newUser.email,
    token: (user),
  })
}

export {signin, signup}
