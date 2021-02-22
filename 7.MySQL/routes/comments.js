const express = require('express');
const { Comment } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    // 댓글 등록 시 해당 부분이 실행
    // const user = await User.findOne({ where: {id: req.body.id}});
    const comment = await Comment.create({
      commenter: req.body.id,
      comment: req.body.comment,
    });
    // const userComment = await user.addComment(comment);
    console.log(comment);
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.route('/:id')
  .patch(async (req, res, next) => {
    // 댓글 수정 시 해당 부분이 실행
    try {
      const result = await Comment.update({
        comment: req.body.comment,
      }, {
        where: { id: req.params.id },
      });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    // destory하여 where조건이 id가 n번인 것을 삭제
    try {
      const result = await Comment.destroy({ where: { id: req.params.id } });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;