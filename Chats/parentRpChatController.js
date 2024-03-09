const chat=require('./parentrpchat')


const chattingParentRp = async (req, res) => {

const { rpid, parentid, content } = req.body;
        
// Create a new message
const message = new chat({
    rpid: rpid,
    parentid: parentid,
    content: content
});
await message.save()

    .then((data) => {
      res.json({
        status: 200,
        msg: "Inserted successfully",
        data: data
      });
    })
    .catch((err) => {
      
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });

}

const viewChatsforParent=(req,res)=>{
    chat.find({parentid:reportError.params.id}).populate('rpid').exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained ",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

module.exports={chattingParentRp,
    viewChatsforParent}