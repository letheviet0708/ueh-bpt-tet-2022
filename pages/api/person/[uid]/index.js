import dbConnect from "../../../../utils/dbConnect";
import Person from "../../../../models/Person"
import person from "..";

dbConnect();

export default async (req, res) => {
    const {method} = req;
    const uid = req.query.uid;
    const person = await Person.findOne({uid: uid}).populate("result")
    console.log(person)
    switch(method) {
        case 'POST':
            console.log(req.query.uid)
            console.log(req.body)
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
                    gen: req.body.gen,
                    phone: req.body.phone,
                    email: req.body.email,
                    uid: req.body.uid,
                    count: 0,
                    result: [null]
                });

                const data = await person.save(person)
                console.log("created", data)
                res.send(data);
            }
            break;
        case 'GET':
            try{
                console.log(req.query.uid)
                res.status(200).json({data: person})
            }catch(e){
                console.log("haha")
                res.status(400).json({ success: false, error: e });
            }
            break;
        case 'PUT':
                console.log(req.query.uid)
                
                const ac1 = new Activity1({
                    title: "giai doan 1"
                })

                const ac = await ac1.save()

                console.log(ac)
                console.log(person)
                
                person.activities.push(ac)
                person.save().then(data => {
                    return res.send(data);
                })
                
            break;
    }
}