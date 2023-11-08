const AssetController = {};

const Asset = require('../models/AssetModel');

// Save assetDoc from req.params.id
AssetController.findAssetFromParams = async (req, res, next) => {
  const assetDoc = await Asset.findById(req.params.id);
  if (!assetDoc) {
    return next({ message: { err: 'Asset not found!!' } });
  }
  console.log('Found asset: ', assetDoc);
  res.locals.assetDoc = assetDoc;
  next();
};

AssetController.addImage = async (req, res, next) => {
  console.log('Adding image: ', req.params.id);
  console.log('AssetDoc Image Files: ', assetDoc.imageFiles);
  assetDoc.imageFiles = [...assetDoc.imageFiles, res.locals.imageDoc._id];
  await assetDoc.save();
  next();
};

AssetController.createAsset = async (req, res, next) => {
  // NOT IMPLEMENTED //
  // Validate user:
  const newAsset = await Asset.create({ title });
  // Add asset to user
  next();
};

module.exports = AssetController;
