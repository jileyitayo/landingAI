'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import useLandingPageStore from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { TrashIcon, UploadCloudIcon } from 'lucide-react';
import Image from 'next/image';

export const MediaLibraryCustomization = () => {
    const { media, addMedia, removeMedia, setMedia } = useLandingPageStore();
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const response = await fetch('/api/media');
                const data = await response.json();
                if (data.success) {
                    setMedia(data.images);
                }
            } catch (error) {
                console.error('Failed to fetch media:', error);
            }
        };

        fetchMedia();
    }, [setMedia]);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        setIsUploading(true);
        const file = acceptedFiles[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/media', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                addMedia({
                    id: result.filename,
                    url: result.url,
                    alt: file.name,
                });
            } else {
                console.error('Upload failed:', result.error);
                // Handle error display to user
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setIsUploading(false);
        }
    }, [addMedia]);

    const handleDelete = async (imageId: string) => {
        try {
            const response = await fetch(`/api/media/${imageId}`, {
                method: 'DELETE',
            });

            const result = await response.json();

            if (result.success || response.status === 404) {
                removeMedia(imageId);
            } else {
                console.error('Failed to delete file from server:', result.error);
            }
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.png', '.gif'] },
        multiple: false,
    });

    return (
        <div className="p-4 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Upload New Image</CardTitle>
                </CardHeader>
                <CardContent>
                    <div
                        {...getRootProps()}
                        className={`p-10 border-2 border-dashed rounded-md text-center cursor-pointer
                        ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'}`}
                    >
                        <input {...getInputProps()} />
                        <UploadCloudIcon className="mx-auto h-12 w-12 text-gray-400" />
                        {isUploading ? (
                            <p>Uploading...</p>
                        ) : isDragActive ? (
                            <p>Drop the image here ...</p>
                        ) : (
                            <p>Drag 'n' drop an image here, or click to select one</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Media Library</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-4">
                    {media.map((image) => (
                        <div key={image.id} className="relative group">
                            <Image
                                src={image.url}
                                alt={image.alt}
                                width={150}
                                height={150}
                                className="object-cover rounded-md aspect-square"
                            />
                            <div className="absolute top-1 right-1">
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => handleDelete(image.id)}
                                >
                                    <TrashIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}; 