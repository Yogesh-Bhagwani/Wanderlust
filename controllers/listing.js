const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;

const geocodingClient = mbxGeocoding({ accessToken: mapToken }); 

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
  // console.log(req.user)
};

module.exports.check = async (req, res) => {
  res.send(req.body);
};

module.exports.createListing = async (req, res) => {
  // let {title, description, image , price , location , country} = req.body ;
  // --------------//
  // if(!req.body.listing){
  //     throw new ExpressError(400, "Send vaild data for listing") //ye isliye use kiya ki jab hoppscoth se post request bheji jati hai matalb data send invaild ya blank ho to err ko handle kiya ja sake
  // }

  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

    console.log(response)


  let url = req.file.path;
  let filename = req.file.filename;
  console.log(url, "..", filename);
  const newListing = new Listing(req.body.listing);
  console.log(req.user);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = response.body.features[0].geometry; // make a geometry its comes from mapbox
  await newListing.save();
  console.log(response.body.features[0]);
  console.log(req.file);
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");

  // let list1 = new Listing({
  //     title : title,
  //     description : description,
  //     image : image,
  //     price : price,
  //     location : location,
  //     country : country,
  // });
};

module.exports.showListing = async (req, res) => {
    
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  if (!listing) {
    //delete kerne ke baad use listing ko search kerega to
    req.flash("error", "Listing you requested does not exist");
    res.redirect("/listings");
  }
  res.render("./listings/show.ejs", { listing , mapToken });
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested does not exist");
    res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (req.file) {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
