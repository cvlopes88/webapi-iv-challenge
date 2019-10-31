const router = require('express').Router();


const Db = require('../db')




router.get('/', (req, res) =>{

    Db.find(req.query).then(dbs => { res.status(200).json(dbs)})
    

.catch(err => { console.log(err);
res.status(500).json({message: 'The posts information could not be retrieved'});

});
});

router.post('/', (req, res) => {

    Db.insert(req.body)
    .then(i => {
        res.status(201).json({message: "Created"})
    })
    .catch(err =>{
        console.log(err);
        res.status(400).json({message: "Please provide title and contents for the post."})
    });
});

router.get('/:id', (req, res) => {
    Db.findById(req.params.id)
    .then(i => {
        if (i) { res.status(200).json(i)}else{
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({error: "The post information could not be retrieved."})
    })
});

router.post('/:id/comments', (req, res) => {

    Db.insertComment(req.body)
    .then(i => {
        if (i) { res.status(201).json({message: "Created"})}else{
            res.status(404).json({message: "The post with the specific Id does not exist."})
        }
    })
    .catch(err => {
        res.status(400).json({error: "Please provide text for the comment"})
    })

});



router.get('/:id/comments', (req, res) => {

    Db.findPostComments(req.params.id)
    .then(i =>{ 
        if (i) { res.status(200).json(i)}else{
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({error: "The comments information could not be retrieved."})
    })
})


router.delete('/:id', (req, res) => {
    Db.remove(req.params.id)
    .then ( e => {
        if(e) { res.status(200).json({message: "Deleted"})}else{
            res.status(404).json({message: "The post with the specific Id does not exist"})
        }
    })
    .catch(err => {
        res.status(500).json({error: "The post could not be removed"})
    })


});

router.put('/:id', (req, res) => {
    Db.update(req.params.id)
    .then ( i => {
        if(i){ res.status(200).json(i)}else{
            res.status(404).json({message: "the post with specific Id could not be found"})
        }
    })

    .catch( err => {

        res.status(500).json({error: "The post information could not be modified."})
    })
})





module.exports = router;