const express = require('express');
var router = express.Router()


var UserModel = require('./userModel');




//Insert data
router.post('/reg', async (req, res) => {
    try {
        const { firstName, lastName, email, phone, dob, gender, username, password } = req.body;

        // Validate input fields (optional)
        if (!firstName || !lastName || !email || !phone || !dob || !gender || !username || !password) {
            return res.status(400).json({ msg: 'Please fill in all fields' });
        }

        // Dummy registration logic (replace this with your actual registration logic)
        const user = new UserModel({
            name: `${firstName} ${lastName}`,
            email,
            phone,
            password,
            address: `${firstName} ${lastName} testaddress`, // Sample address generation
            dob,
            gender,
            username
        });

        await user.save();

        res.status(200).json({
            status: true,
            msg: "User Registered Successfully",
            data: user
        });
        res.redirect('/index.html');

    } catch (e) {
        console.log(e);
        res.status(500).json({
            status: false,
            msg: 'Something went wrong!'
        });
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/getDetails',async(req,res)=>{
    try{
       var data = await UserModel.find();
        res.status(200).json({
            status:true,
            msg:"User Registered Successfully",
            data:data
        })
        return;
    }catch (e) {
            console.log(e)
            res.status(500).json({
                status: false,
                msg: 'Something went wrong!'
            });
        }
})




router.get('/delete', async (req, res) => {
    try {
        var { email } = req.query;

        // Check if the email parameter is provided
        if (!email) {
            return res.status(400).json({
                status: false,
                msg: 'Email parameter is missing'
            });
        }

        var user = await UserModel.findOne({ email: email });

        // Check if the user with the specified email exists
        if (user) {
            await UserModel.deleteOne({ email: email });
            return res.status(200).json({
                status: true,
                msg: 'User deleted successfully'
            });
        } else {
            return res.status(404).json({
                status: false,
                msg: 'User not found',
                email: email
            });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            status: false,
            msg: 'Internal server error',
            error: e.message
        });
    }
});





router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: 'Please provide both email and password' });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ msg: 'Invalid credentials' });
        }

        // You should use a secure method to compare passwords, for example, bcrypt.compare
        if (user.password !== password) {
            return res.status(401).json({ msg: 'Invalid credentials' });
        }

        res.status(200).json({
            status: true,
            msg: 'Login successful',
            data: user,
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            status: false,
            msg: 'Something went wrong!',
        });
    }
});







//edit*///////////////////////////////////
router.get('/editDetails',async(req,res)=>{
    try{
        var { studentId,name,email,phone,password,address } = req.query;
        if(!studentId){
            return res.status(401).json({msg:'Invalid id'})
        }
        if(!name){
            return res.status(401).json({msg:'Please enter your Name'})
        }
        if(!email){
            return res.status(401).json({msg:'Please enter your Email'})
        }
        if(!phone){
            return res.status(401).json({msg:'Please enter your Phone Number'})
        }
        if(!address){
            return res.status(401).json({msg:'Please enter your Address'})
        }
        var user = await UserModel.findById(studentId)
        if(!user){
            return res.status(401).json({msg:'Invalid data'})
        }
        user.name = name;
        user.email = email;
        user.phone = phone;
        user.address = address;
        await user.save();
        res.status(200).json({
            status:true,
            msg:"User edited Successfully",
            data:user
        })
        return;
    }catch (e) {
            console.log(e)
            res.status(500).json({
                status: false,
                msg: 'Something went wrong!'
            });
        }
})

router.get('/getDetailsById',async(req,res)=>{
    try{
        var { id } = req.query;
        if(!id){
            return res.status(401).json({msg:'Invalid Id'})
        }
        var data = await UserModel.findById(id)
        if(!data){
            return res.status(401).json({msg:'Invalid data'})
        }
        res.status(200).json({
            status:true,
            msg:"User Registered Successfully",
            data:data
        })
        return;
    }catch (e) {
            console.log(e)
            res.status(500).json({
                status: false,
                msg: 'Something went wrong!'
            });
        }
})





module.exports = router;