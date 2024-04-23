const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Default options for image optimization
const defaultOptions = {
  width: 0,
  height: 0,
  format: 'webp',
};

/**
 * Optimize images in the specified directory or a single file.
 *
 * @param {string} directoryOrFile - The directory containing images to be optimized, or a single image file.
 * @param {Object} options An optional object containing optimization options:
 *   - width: The desired width of the optimized images (default: 0).
 *   - height: The desired height of the optimized images (default: 0).
 *   - format: The desired format of the optimized images (default: 'webp').
 *
 * @example
 * // Optimize images in a directory with default options
 * optimizeImages('/path/to/directory');
 * // Equivalent Node.js call: node optimizeImages.js /path/to/directory
 *
 * @example
 * // Optimize a single image file with default options
 * optimizeImages('/path/to/image.jpg');
 * // Equivalent Node.js call: node optimizeImages.js /path/to/image.jpg
 *
 * @example
 * // Optimize images in a directory with custom width, height, and format options
 * optimizeImages('/path/to/directory', { width: 160, height: 160, format: 'webp' });
 * // Equivalent Node.js call: node optimizeImages.js /path/to/directory 160 160 webp
 */
function optimizeImages(directoryOrFile, options = {}) {
  const { width, height, format } = { ...defaultOptions, ...options };

  // Check if the provided path is a directory or a file
  fs.lstat(directoryOrFile, (err, stats) => {
    if (err) {
      console.error(
        `optimizeImages > 🔴 Error accessing file or directory: ${directoryOrFile}. Error: `,
        err
      );
      return;
    }

    if (stats.isDirectory()) {
      // Directory path provided, optimize all images in the directory
      optimizeDirectory(directoryOrFile, width, height, format);
    } else if (stats.isFile()) {
      // File path provided, optimize the single file
      optimizeFile(directoryOrFile, width, height, format);
    }
  });
}

/**
 * Optimize all images in the specified directory.
 * @param {string} directory - The directory containing images to be optimized.
 * @param {number} width - The width for resizing the images.
 * @param {number} height - The height for resizing the images.
 * @param {string} format - The output format for the optimized images.
 */
function optimizeDirectory(directory, width, height, format) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(
        `optimizeImages > optimizeDirectory > 🔴 Error reading directory: ${directory}. Error: `,
        err
      );
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      optimizeImage(filePath, width, height, format);
    });
  });
}

/**
 * Optimize a single image file.
 * @param {string} filePath - The path to the image file to be optimized.
 * @param {number} width - The width for resizing the image.
 * @param {number} height - The height for resizing the image.
 * @param {string} format - The output format for the optimized image.
 */
function optimizeFile(filePath, width, height, format) {
  optimizeImage(filePath, width, height, format);
}

/**
 * Optimize a single image.
 * @param {string} filePath - The path to the image file to be optimized.
 * @param {number} width - The width for resizing the image.
 * @param {number} height - The height for resizing the image.
 * @param {string} format - The output format for the optimized image.
 */
function optimizeImage(filePath, width, height, format) {
  const fileNameWithoutExt = path.basename(filePath, path.extname(filePath));
  const outputFileName = `${fileNameWithoutExt}-${width}x${height}.opt.${format}`;
  const outputFilePath = path.join(path.dirname(filePath), outputFileName);

  // Check if the output file already exists
  if (fs.existsSync(outputFilePath)) {
    console.log(
      `optimizeImages > optimizeImage > ✅ Image ${filePath} already optimized as ${outputFilePath}`
    );
    return;
  }

  // Create a Sharp instance
  let sharpInstance = sharp(filePath);

  // Resize the image if width and height are provided
  if (width > 0 && height > 0) {
    sharpInstance = sharpInstance.resize(width, height);
  }

  // Perform sharp conversion
  sharpInstance.toFormat(format).toFile(outputFilePath, (err) => {
    if (err) {
      console.error(
        `optimizeImages > optimizeImage > 🔴 Error processing file ${filePath}:`,
        err
      );
    } else {
      console.log(
        `optimizeImages > optimizeImage > ✅ Image ${filePath} optimized and saved as ${outputFilePath}`
      );
    }
  });
}

// Check if the script is being called from the command line
if (require.main === module) {
  // Parse command line arguments
  const [, , directoryOrFilePath, width, height, format] = process.argv;

  // Convert width and height to numbers
  const widthNumber = parseInt(width, 10);
  const heightNumber = parseInt(height, 10);

  // Call the optimizeImages function with the provided arguments
  optimizeImages(directoryOrFilePath, {
    width: widthNumber,
    height: heightNumber,
    format: format || defaultOptions.format, // Set format to default if not provided
  });
}
