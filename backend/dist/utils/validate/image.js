"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
class Image {
    isValid(image) {
        if (!image)
            return false;
        const imageClearSpace = image.trim();
        if (imageClearSpace.length === 0)
            return false;
        const imageUrlFormat = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        return imageUrlFormat.test(imageClearSpace);
    }
    getErrorMessage() {
        return "Image is not valid";
    }
}
exports.Image = Image;
