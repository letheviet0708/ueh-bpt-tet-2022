import dbConnect from "../../../utils/dbConnect";
import Person from "../../../models/Person"

dbConnect();

const getPagination = (page, size) => {
    var limit = size ? size : 9;
    
    var offset = page ? page * limit : 0;
  
    return { limit, offset };
};

export default async (req, res) => {
    const {method} = req;
    console.log(process.version)
    switch (method) {
        case 'GET':
            try{
                const { page, size, clan, sort } = req.query;

                if (page){
                    var condition = clan
                    ? {clan}
                    : {};
                    //console.log(condition);  
                    
                    const { limit, offset } = getPagination(page, size);
                    console.log("sort", sort)
                    var options = {}
                    if (sort){
                        options = {
                            sort: {[sort]: -1},
                            populate: 'result',
                            lean: true,
                            offset: offset, 
                            limit: limit
                        }
                    }
    
                    const persons = await Person.paginate(condition, options)
                    res.status(200).json({
                        totalPersons: persons.totalDocs,
                        person: persons.docs,
                        totalPages: persons.totalPages,
                        currentPage: persons.page - 1,
                    })                           
                }else{
                    const persons = await Person.find().populate('result')
                    res.send(persons)
                }

            }catch (e) {
                res.status(500).json({ message: e.message || "Some error occurred while retrieving tutorials."})
            }
            break;
        case 'POST':
            try{
                if (!req.body.name) {
                    res.status(400).send({ message: "Content can not be empty!" });
                    return;
                }
                /*
                Person.findOneAndUpdate({mssv: req.body.mssv}, req.body, { useFindAndModify: false })
                    .then(data => {
                        if(!data) {
                            */
                            console.log(-req.body)
                            const person = new Person({
                                name: req.body.name,
                                mssv: req.body.mssv,
                                clan: req.body.clan,
                                avatar: req.body.avatar,
                                gen: req.body.gen,
                                sex: req.body.sex,
                                uid: req.body.uid,
                                phone: req.body.phone,
                                mail: req.body.mail
                            });
            
                            person
                                .save(person)
                                .then(data => {
                                    res.send(data);
                                })
                                .catch(err => {
                                    res.status(500).send({
                                        message: 
                                            err.message || "Some error occurred while creating the Person."
                                    });
                                });
                    /*
                        }else{
                            res.send({ message: "Person was updated successfully." })
                        }
                    
                    })
                    .catch(err => {
                        res.status(500).send({message: "Error updating Person with id=" + id})
                    })*/
            }catch (e){
                
            }
            break;
    }
}