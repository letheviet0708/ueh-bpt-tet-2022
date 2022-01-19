import dbConnect from "../../../utils/dbConnect";
import Person from "../../../models/Person"
import ActivityResult from "../../../models/ActivityResult"

dbConnect();



export default async (req, res) => {
    const {method} = req;
    console.log(process.version)
    console.log(req.body)
    switch (method) {
        case 'POST':
            try{
                const {type} = req.body
                switch(type){                    
                    case "all":
                        const persons = await Person.find().sort({updatedAt: req.body.updateAt}).populate('result')
                        res.send(persons)
                        break;
                    case "Activity":
                        const filter = {
                            activityIndex: req.body.section
                        }
                        if (req.body.state != 4){
                            filter["state"] = req.body.state
                        }
                        const results = await ActivityResult.find(filter).sort({updatedAt: req.body.updateAt}).populate('user')
                        res.send(results)
                        break;
                    case "Count":
                        const persons2 = await Person.find({count: req.body.number}).sort({updatedAt: req.body.updateAt}).populate('result')
                        res.send(persons2)
                        break;
                    case "MSSV":
                        const person3 = await Person.find({mssv: req.body.mssv}).populate("result")
                        res.send(person3)
                        break;
                }
            }catch (e) {
                res.status(500).json({ message: e.message || "Some error occurred while retrieving tutorials."})
            }
            break;
    }
}