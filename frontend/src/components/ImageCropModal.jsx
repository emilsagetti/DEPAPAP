import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { X, Check, RotateCcw, Loader2 } from 'lucide-react';

// Utility to center and create initial crop
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 80,
            },
            aspect,
            mediaWidth,
            mediaHeight
        ),
        mediaWidth,
        mediaHeight
    );
}

// Convert crop to canvas and return blob
async function getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Set desired output size (256x256 for avatar)
    const outputSize = 256;
    canvas.width = outputSize;
    canvas.height = outputSize;

    const ctx = canvas.getContext('2d');

    ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        outputSize,
        outputSize
    );

    return new Promise((resolve) => {
        canvas.toBlob(
            (blob) => {
                if (blob) {
                    const file = new File([blob], fileName, { type: 'image/jpeg' });
                    resolve(file);
                }
            },
            'image/jpeg',
            0.9
        );
    });
}

const ImageCropModal = ({ isOpen, onClose, imageFile, onCropComplete }) => {
    const [crop, setCrop] = useState();
    const [completedCrop, setCompletedCrop] = useState();
    const [isProcessing, setIsProcessing] = useState(false);
    const imgRef = useRef(null);
    const [imgSrc, setImgSrc] = useState('');

    // Load image when file changes
    React.useEffect(() => {
        if (imageFile) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setImgSrc(reader.result?.toString() || '');
            });
            reader.readAsDataURL(imageFile);
        }
    }, [imageFile]);

    // Set initial crop when image loads
    const onImageLoad = useCallback((e) => {
        const { width, height } = e.currentTarget;
        const crop = centerAspectCrop(width, height, 1); // 1:1 aspect ratio for avatar
        setCrop(crop);
        setCompletedCrop(crop);
    }, []);

    // Reset crop to center
    const handleReset = () => {
        if (imgRef.current) {
            const { width, height } = imgRef.current;
            const crop = centerAspectCrop(width, height, 1);
            setCrop(crop);
            setCompletedCrop(crop);
        }
    };

    // Apply crop and close
    const handleApply = async () => {
        if (!imgRef.current || !completedCrop) return;

        setIsProcessing(true);
        try {
            const croppedFile = await getCroppedImg(
                imgRef.current,
                completedCrop,
                imageFile?.name || 'avatar.jpg'
            );
            onCropComplete(croppedFile);
            onClose();
        } catch (err) {
            console.error('Error cropping image:', err);
        } finally {
            setIsProcessing(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                        <h3 className="text-lg font-bold text-slate-900">Кадрирование фото</h3>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
                        >
                            <X size={20} className="text-slate-500" />
                        </button>
                    </div>

                    {/* Crop Area */}
                    <div className="p-6 bg-slate-50">
                        <div className="relative flex items-center justify-center bg-slate-200 rounded-xl overflow-hidden min-h-[300px]">
                            {imgSrc ? (
                                <ReactCrop
                                    crop={crop}
                                    onChange={(c) => setCrop(c)}
                                    onComplete={(c) => setCompletedCrop(c)}
                                    aspect={1}
                                    circularCrop
                                    className="max-h-[400px]"
                                >
                                    <img
                                        ref={imgRef}
                                        src={imgSrc}
                                        alt="Crop preview"
                                        onLoad={onImageLoad}
                                        className="max-h-[400px] max-w-full"
                                        style={{ display: 'block' }}
                                    />
                                </ReactCrop>
                            ) : (
                                <div className="flex items-center justify-center h-[300px]">
                                    <Loader2 size={24} className="animate-spin text-slate-400" />
                                </div>
                            )}
                        </div>

                        {/* Help text */}
                        <p className="text-center text-sm text-slate-500 mt-4">
                            Перетащите область выделения для выбора нужной части фото
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-white">
                        <button
                            onClick={handleReset}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <RotateCcw size={16} />
                            Сбросить
                        </button>

                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={handleApply}
                                disabled={isProcessing || !completedCrop}
                                className="flex items-center gap-2 px-4 py-2 bg-depa-cta hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold rounded-lg transition-colors"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        Обработка...
                                    </>
                                ) : (
                                    <>
                                        <Check size={16} />
                                        Применить
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ImageCropModal;
