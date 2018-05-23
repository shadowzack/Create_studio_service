const express = require('express');
const router  = express.Router();
const Movie=require('../models/Movie');
const mongoose=require('mongoose');

//get all movies
router.get('/',(req ,res,next)=>{

    Movie.find().select('name ').exec().then((result) => {
        const response={
            movies:result.map(movie=>{
                return{
                    _id:movie._id,
                    name:movie.name,
                   
                }
            })
        };
        console.log(result);
        res.status(200).json(response);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
    
});



//create new movie
router.post('/',(req ,res,next)=>{

    const movie=new Movie({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name
    });   
    movie.save().then((result) => {
        console.log(result);
        res.status(200).json({
            message:'movie created successfully',
            createdMovie:movie
        });
    }).catch((err) => {
        console.log(err);

        res.status(500).json({
            error:err,
            
        });
    });
    
});


//get movie by id GET
router.get('/:movie_id',(req,res,next)=>{

    const id= req.params.movie_id;
    Movie.findById(id).exec().then((result) => {
        console.log(result);
        res.status(200).json({
            result
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
    
});


//delete movie
router.delete("/:movie_id",(req,res,next)=>{
    const id=req.params.movie_id;
    Movie.remove({_id:id}).exec().then((result) => {
        console.log(result);
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });;
});

module.exports = router;