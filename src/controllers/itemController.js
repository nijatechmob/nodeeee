const Item = require("../models/Item");

const addItem = async(req,res)=>{

    try{

        const item = await Item.create(req.body);

        res.status(200).json({
            success:true,
            message:"Item Added",
            data:item
        });

    }catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

}

const getItems = async(req,res)=>{

    const items = await Item.find().sort({itemId:1});

    res.json({
        success:true,
        data:items
    });

}
const updateItem = async(req,res)=>{

    try{

        const {itemId}=req.params;

        const item = await Item.findOneAndUpdate(
            {itemId},
            req.body,
            {new:true}
        );

        if(!item){

            return res.status(404).json({
                success:false,
                message:"Item not found"
            });

        }

        res.json({
            success:true,
            message:"Item Updated",
            data:item
        });

    }catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

}

const deleteItem = async(req,res)=>{

    try{

        const {itemId}=req.params;

        const item = await Item.findOneAndDelete({
            itemId
        });

        if(!item){

            return res.status(404).json({
                success:false,
                message:"Item not found"
            });

        }

        res.json({
            success:true,
            message:"Item Deleted"
        });

    }catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

}