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
                        let cond = {}
                        if (req.body.gen != "All"){
                            cond["gen"] = req.body.gen
                        }
                        const persons = await Person.find(cond).sort({updatedAt: req.body.updateAt}).populate('result')
                        res.send(persons)
                        break;
                    case "Activity":
                        let cond1 = {
                            activityIndex: req.body.section
                        }
                        if (req.body.state != 4){
                            cond1["state"] = req.body.state
                        }
                        if (req.body.gen != "All"){
                            cond1["gen"] = req.body.gen
                        }
                        const results = await ActivityResult.find(cond1).sort({updatedAt: req.body.updateAt}).populate('user')
                        res.send(results)
                        break;
                    case "Count":
                        let cond2 = {count: req.body.number}
                        if (req.body.gen != "All"){
                            cond2["gen"] = req.body.gen
                        }
                        const persons2 = await Person.find(cond2).sort({updatedAt: req.body.updateAt}).populate('result')
                        res.send(persons2)
                        break;
                    case "MSSV":
                        const person3 = await Person.find({mssv: req.body.mssv}).populate("result")
                        res.send(person3)
                        break;
                    case "GIF":
                        const person4 = await Person.find({gifCharacter: { $ne: null }}).sort({updatedAt: req.body.updateAt}).populate("result")
                        res.send(person4)
                        break;
                }
            }catch (e) {
                res.status(500).json({ message: e.message || "Some error occurred while retrieving tutorials."})
            }
            break;
    }
}