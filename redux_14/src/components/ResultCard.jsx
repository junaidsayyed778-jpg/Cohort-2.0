import React from 'react'

const ResultCard = ({ item }) => {
  if (!item) return null

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      {item.type === "video" ? (
        <video
          src={item.src}
          poster={item.thumbnail}
          controls
          className="w-full h-44 object-cover"
        />
      ) : (
        <img
          src={item.thumbnail}
          alt={item.title || "image"}
          className="w-full h-44 object-cover"
        />
      )}

      <div className="p-2">
        <p className="text-sm text-gray-300 truncate">
          {item.title || "Untitled"}
        </p>
      </div>
    </div>
  )
}

export default ResultCard
