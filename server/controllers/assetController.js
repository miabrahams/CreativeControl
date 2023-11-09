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
  console.log('AssetDoc Image Files: ', res.locals.assetDoc.imageFiles);
  res.locals.assetDoc.imageFiles = [...assetDoc.imageFiles, res.locals.imageDoc._id];
  await assetDoc.save();
  next();
};

AssetController.createAsset = async (req, res, next) => {
  // Validate user:
  // NOT IMPLEMENTED //
  const title = req.body.title || '';
  const imageFiles = res.locals.imageDoc ? [res.locals.imageDoc] : []
  res.locals.assetDoc = await Asset.create({ title, imageFiles });
  next();
};


AssetController.deleteAsset = async (req, res, next) => {
  // Validate user:
  // NOT IMPLEMENTED //
  const deleteResult = await Asset.deleteOne({_id: req.params.assetId});
  console.log('Delete result: ', deleteResult);
  next();
};


AssetController.patchAsset = async (req, res, next) => {
  console.log('Updates: ', req.body);
  const editResult = await Asset.updateOne({_id: req.params.assetId}, req.body);
  console.log('Edit result: ', editResult);
  next();
};


module.exports = AssetController;
