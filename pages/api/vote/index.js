import dbConnect from "../../../utils/dbConnect";
import Person from "../../../models/Person"

dbConnect();

const getVoteData = () =>{
    Person.find().then((data) =>{
        let arr = [0]
        for (let i = 1; i <= 10; i++){
            arr.push(data.filter(person => person.vote == i).length)
        }
        return arr
    })
    // return persons

    const test = [
        {
            vote: 1,
        },
        {
            vote: 2,
        },
        {
            vote: 1,
        },
        {
            vote: 3,
        },
        {
            vote: 4,
        },
        {
            vote: 6,
        },
        {
            vote: 7,
        },
        {
            vote: 8,
        },
        {
            vote: 3,
        },
        {
            vote: 4,
        },
        {
            vote: 6,
        },
        {
            vote: 7,
        },
        {
            vote: 8,
        },
        {
            vote: 3,
        },
        {
            vote: 9,
        },
        {
            vote: 6,
        },
        {
            vote: 7,
        },
        {
            vote: 10,
        },
    ]

    // let arr = [0]
    // for (let i = 1; i <= 10; i++){
    //     arr.push(test.filter(person => person.vote == i).length)
    // }
    // return arr
}

export default async (req, res) => {
    const {method} = req;
    switch(method) {
        case 'POST':
            console.log(req.body)
            const data = await Person.findOneAndUpdate({uid: req.body.uid}, {vote: req.body.vote}, {new: true});
            console.log("updated", data)

            const personss = await Person.find()
            
            let arrr = [0]
            for (let i = 1; i <= 10; i++){
                arrr.push(personss.filter(person => person.vote == i).length)
            }
            res.send({user: data, data: arrr});
            break;
        case 'GET':
            const persons = await Person.find()
            
            let arr = [0]
            for (let i = 1; i <= 10; i++){
                arr.push(persons.filter(person => person.vote == i).length)
            }
            res.send(arr);
            break;
    }
}