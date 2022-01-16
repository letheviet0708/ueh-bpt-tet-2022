import dbConnect from "../../../../utils/dbConnect";
import Person from "../../../../models/Person"
import person from "..";

dbConnect();

export default async (req, res) => {
    const {method} = req;
    
    switch(method) {
        case 'GET':
            try{
                console.log(req.query.id)
                const uid = req.query.uid;
                const person = await Person.findOne({uid: uid})
                if(!person){
                    return res.status(400).json({message:"Could not find person"})
                }
                res.status(200).json({data: person})
            }catch(e){
                console.log("haha")
                res.status(400).json({ success: false, error: e });
            }
            break;
    }
}