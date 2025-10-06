const Listing = require("../models/listing");
const User = require("../models/user")

module.exports.index = async (req,res)=>{  // 3
    const allListings = await Listing.find({}) ;
    res.render("listings/index.ejs",{allListings})
}


module.exports.renderNewForm = async(req,res)=>{
    res.render("listings/new.ejs");
}

module.exports.createListing = async (req, res, next) => {
  let { title, description, price, location, country } = req.body.listing;
  const newListing = new Listing({
    title,
    description,
    price,
    location,
    country
  });

  if (req.file) {
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
  }

  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "New listing is created!!");
  res.redirect("/listings");
};


module.exports.showListing = async (req,res)=>{
    let{id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path : "reviews", populate : {
            path : "author"
        }})
    .populate("owner") //
     if(!listing) {
        req.flash("error","Listing for you requested does not exist")
     res.redirect("/listings")
    }else{ 
    res.render("listings/show.ejs",{listing})
}}


module.exports.renderEditform  = async (req,res)=>{
    let{id} = req.params;
    const listing = await Listing.findById(id);
     if(!listing) {
        req.flash("error","Listing for you requested does not exist") 
     res.redirect("/listings")
     }else{
      let OriginalImageUrl = listing.image.url;
      OriginalImageUrl  =  OriginalImageUrl.replace("/upload","/upload/h_200,w_200")
    res.render("listings/edit.ejs",{listing,OriginalImageUrl})
}}


module.exports.updateListing = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,req.body.listing);
    if(typeof req.file  !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url,filename}
    await listing.save()
    }
   req.flash("success", "Listing is updated!!")
    res.redirect(`/listings/${id}`);
   
}



module.exports.destroyListing = async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id); 
    req.flash("success", "Listing is deleted!!")
    res.redirect("/listings");

}