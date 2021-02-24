const express = require('express');
const Comment = require('../schemas/comment');

const router = express.Router();

// 댓글을 등록하는 부분
router.post('/',async (req, res, next)=>{
    try{
        const comment = await Comment.create({
            commenter: req.body.id,
            comment: req.body.comment,
        });
        console.log(comment);
        const result = await Comment.populate(comment, {path: 'commenter' });
        res.status(201).json(result);
    }
    catch(err){
        console.error(err);
        next(err);
    }
});
// id를 클릭하면 작성한 댓글이 보이는 라우터
router.route('/:id')
    .patch(async (req,res,next)=>{
        try{
            const result = await Comment.update({
                _id: req.params.id,
            }, {
                // set을 안 붙여도 알아서 보호가 됨
                comment: req.body.comment,
            });
            res.json(result);
        }
        catch(err){
            console.error(err);
            next(err);
        }
    })
    // 댓글 삭제 부분
    .delete(async(req, res, next)=>{
        try{
            const result = await Comment.remove({ _id:req.params.id});
            res.json(result);
        }
        catch(err){
            console.error(err);
            next(err);
        }
    });

    module.exports = router;