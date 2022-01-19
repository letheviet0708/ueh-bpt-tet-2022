import dbConnect from "../../../../utils/dbConnect";
import Person from "../../../../models/Person"
import ActivityResult from "../../../../models/ActivityResult"

dbConnect();

export default async (req, res) => {
    const {method} = req;
    const uid = req.query.uid;
    let person;
    switch(method) {
        case 'POST':
            console.log(req.query.uid)
            console.log(req.body)
            person = await Person.findOne({uid: uid})
            if (req.body.new == true){
                console.log("kk")
                const activityResult = new ActivityResult({
                    activityIndex : req.body.activityIndex,
                    images : req.body.images,
                    text : req.body.text,
                    user : person,
                    state: req.body.state
                })
                /*
                const result = await activityResult.save()
                console.log("ihi", result)
                console.log("aha", person)
                person.result.push(result)
                const data = await person.save(person)
                console.log("created and added", data)
                res.send(result);
                */

                console.log(person.result)
                
                await activityResult.save().then((result) => {
                    console.log(result)
                    person.result.push(result)
                    person.save().then((data)=>{
                        console.log(data)
                        res.send(data)
                    })
                })

            }else{
                const data = await ActivityResult.findOneAndUpdate({_id: req.body.id}, req.body);
                console.log("edited", data)
                res.send(data)
            }
            break;
        
        case 'PUT':
            const data = await ActivityResult.findOneAndUpdate({_id: req.body.id}, 
                req.body, {new: true} ).populate("user");
            person = await Person.findOne({uid: uid}).populate("result")
            let count = 0;
            for (const x of person.result){
                if (x.state == 2){
                    count ++;
                }
            }      
            person.count = count
            const data2 = await person.save()
            res.send({person: data2, result: data})
            break;
    }
}