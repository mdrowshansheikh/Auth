import connectDB from './../../../database/connectDB';
import Users from '../../../models/userSchema';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
  connectDB().catch((error) => res.json({ error: 'Connection Failed...!' }));

  // only post method is accepted
  if (req.method === 'POST') {
    if (!req.body)
      return res.status(404).json({ error: "Don't have form data...!" });
    const { username, email, password } = req.body;

    // check duplicate users
    const checkexisting = await Users.findOne({ email });
    if (checkexisting)
      return res.status(422).json({ message: 'User Already Exists...!' });

    // hash password
    Users.create(
      { username, email, password: await hash(password, 12) },
      function (err, data) {
        if (err) return res.status(404).json({ err });
        res.status(201).json({ status: true, user: data });
      }
    );
  } else {
    res
      .status(500)
      .json({ message: 'HTTP method not valid only POST Accepted' });
  }
}
// import { hash } from 'bcryptjs';
// import connectDB from '../../../database/connectDB';
// import Users from './../../../models/userSchema';

// export default async function handler(req, res) {
//   connectDB().catch((error) => res.json({ error: 'Connection fild' }));
//   // Only POST method accepted ===================>
//   if (req.method === 'POST') {
//     // check the body data=============>
//     if (!req.body) {
//       res.status(404).json({ error: 'Dont have form data' });
//     }
//     const { username, email, password } = req.body;
//     // check duplicate user ===================>
//     const checkExistsUser = await Users.findOne({ email });
//     if (checkExistsUser) {
//       res.status(422).json({ message: 'User already exists' });
//     }
//     // hash the password and create the user==================>
//     Users.create(
//       { username, email, password: await hash(password, 10) },
//       function (err, data) {
//         if (err) {
//           res.status(404).json({ err });
//           res.status(201).json({ status: true, user: data });
//         }
//       }
//     );
//   } else {
//     res
//       .status(500)
//       .json({ error: 'HTTP request invalid only POST request accepted' });
//   }
// }
