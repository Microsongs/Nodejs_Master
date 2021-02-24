const express = require('express');
const User = require('../schemas/user');
const Comment = require('../schemas/comment');

const router = express.Router();

router.route('/')
    // 유저를 찾는 부분
    .get(async (req,res,next)=>{
        try{
            const users = await User.find({});
            res.json(users);
        }
        catch(err){
            console.error(err);
            next(err);
        }
    })
    // 유저 생성 부분 -> Post요청
    .post(async (req,res,next)=>{
        try{
            // 몽고db에서는 save이지만 몽구스에서는 create로 생성
            const user = await User.create({
                name: req.body.name,
                age: req.body.age,
                married: req.body.married,
            });
            console.log(user);
            res.status(201).json(user);
        }
        catch(err){
            console.error(err);
            next(err);
        }
    });
    // 유저를 클릭했을 때 해당 유저의 댓글을 가져오는 함수
    router.get('/:id/comments',async(req,res,next)=>{
        try{
            const comments = await Comment.find({ commenter: req.params.id })
            // popluate는
                .populate('commenter');
            console.log(comments);
            res.json(comments);
        }
        catch(err){
            console.error(err);
            next(err);
        }
    });

    module.exports = router;