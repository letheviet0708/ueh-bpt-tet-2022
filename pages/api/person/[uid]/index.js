import dbConnect from "../../../../utils/dbConnect";
import Person from "../../../../models/Person"
import person from "..";

dbConnect();

export default async (req, res) => {
    const {method} = req;
    
    switch(method) {
        case 'POST':
            console.log(req.query.uid)
            const uid = req.query.uid;
            console.log(req.body)
            const person = await Person.findOne({uid: uid})
            if (person){
                const data = await Person.findOneAndUpdate({uid: uid}, req.body);
                console.log("updated", data)
                res.send(data);
            }else{
                console.log(req.body)
                const person = new Person({
                    name: req.body.name,
                    mssv: req.body.mssv,
                    clan: req.body.clan,
                    avatar: req.body.avatar,
                    cls: req.body.cls,
                    phone: req.body.phone,
                    email: req.body.email,
                    uid: req.body.uid,
                });

                const data = await person.save(person)
                console.log("created", data)
                res.send(data);
            }
            break;
        case 'GET':
            try{
                console.log(req.query.uid)
                const uid = req.query.uid;
                const person = await Person.findOne({uid: uid})
                res.status(200).json({data: person})
            }catch(e){
                console.log("haha")
                res.status(400).json({ success: false, error: e });
            }
            break;
    }
}