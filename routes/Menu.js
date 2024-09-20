import express from "express";
import multer from "multer";
import auth from "../middleware/auth.js";
import data from "../db/models/Menu.js"
import dotenv from "dotenv";
dotenv.config();
const mult = multer();
const router = express.Router();




    router.get("/menu", auth, mult.any(), async (req, res) => {
       try {
         let id = "66ecf39289b6b0f2b3855f01"
         const Role_id= req.decoded.role_Id;        
         let result = await data.findById(id)
         if (Role_id == 0) {
             res.json({ success: true, data: result.Model0, });
         } else if (Role_id == 1) {
             res.json({ success: true, data: result.Model1, });
         } else {
             res.json({ success: false, message: "Somethig went wrong", });
         }
       } catch (error) {
        
       }
    })


    router.post("/menu1", mult.any(), async (req, res) => {
        let datas = {
            Model0: [
                { text: 'Dashboard', path: '/' },
                { text: 'Sales', path: '/sales' },
                { text: 'Invoices', path: '/invoices' },
                { text: 'Customers', path: '/customers' },
                { text: 'Users', path: '/users' },
                { text: 'Register', path: '/register' },
                { text: 'Logout', path: '/login' },
              
            ],
            Model1: [
                { text: 'Dashboard', path: '/' },
                { text: 'Sales', path: '/sales' },
                { text: 'Invoices', path: '/invoices' },
                { text: 'Customers', path: '/customers' },
                { text: 'Logout', path: '/login' },
            ]
        }
        let mune = await data(datas)
        let result = await mune.save()
        res.json({
            success: true,
            message: "Menu add successfully",
            data: result,
        });
    })

    // router.post("/test", multer.any(), async (req, res) => {
    //     const email = req.body.email
    //     const result = await validateUserSignUp(email)
    //     if (result) {
    //         console.log("yess");
    //         res.send("ok")
    //     } else {
    //         console.log(otpv);
    //         // res.send("ok")

    //     }
    // })
    // const validateUserSignUp = async (email) => {

    //     console.log(email);
    //     let result = await otpv(email)
    //     // if(email){
    //     //     return true
    //     // }else{
    //     //     return false
    //     // }

    // }


    // router.post("/otp", multer.any(), async (req, res) => {

    //     const otpv = async (email) => {

    //     }
    //     console.log(req.email)
    //     const otp = req.nody.otp
    //     if (otp) {
    //         res.send(otp)
    //         return true
    //     }

    // })


    // router.post("/encryption", multer.any(), async (req, res) => {
    //     try {
    //         var data = req.body
    //         const encryption = await jwt.sign(
    //             { data },
    //             SECRET_KEY,
    //             {
    //                 // expiresIn: "2h",
    //             }
    //         );
    //         res.json({ data: encryption })
    //     } catch (error) {
    //         console.log(error);

    //     }
    // })
   
    // router.post("/decryption", multer.any(), async (req, res) => {
    //     try {
    //         const data = req.body.info
    //         // const requestBodyObject = JSON.parse(data.toString());
    //         const  decoded = jwt.verify(data, SECRET_KEY);
    //         // let decoded = base64json.parse(data);
    //         res.json(decoded)
    //     } catch (error) {
    //         console.log(error);
    //         res.json(error)
    //     }
    // })
export default router;