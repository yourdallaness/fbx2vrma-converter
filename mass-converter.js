const fs = require('fs-extra');
const path = require('path');
const FBXToVRMAConverterFixed = require('./fbx2vrma-converter.js');

async function massConvert() {
  const inputDir = path.join(__dirname, 'input');
  const outputDir = path.join(__dirname, 'output');
  const fbx2gltfPath = './FBX2glTF-darwin-x64'; // Assuming the binary is in the root

  try {
    await fs.ensureDir(outputDir);
    const files = await fs.readdir(inputDir);
    const fbxFiles = files.filter((file) => path.extname(file).toLowerCase() === '.fbx');

    if (fbxFiles.length === 0) {
      console.log('No FBX files found in the input directory.');
      return;
    }

    console.log(`Found ${fbxFiles.length} FBX files to convert.`);

    const converter = new FBXToVRMAConverterFixed(false);

    for (const fbxFile of fbxFiles) {
      const inputPath = path.join(inputDir, fbxFile);
      const outputFileName = `${path.basename(fbxFile, '.fbx')}.vrma`;
      const outputPath = path.join(outputDir, outputFileName);

      await converter.convert(inputPath, outputPath, fbx2gltfPath, '30', true);
    }

    console.log('All conversions completed.');
  } catch (error) {
    console.error('An error occurred during mass conversion:', error);
  }
}

massConvert();
