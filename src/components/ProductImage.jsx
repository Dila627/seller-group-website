import { useState } from "react";

function ProductImage({ src, alt, brand, className = "", onClick }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`grid place-items-center overflow-hidden bg-slate-100 text-left ${className}`}
        style={{ backgroundColor: `${brand.packageColor}18` }}
      >
        <div className="grid place-items-center px-6 text-center">
          <span
            className="mb-4 grid h-16 w-16 place-items-center rounded-2xl text-2xl font-black text-white"
            style={{ backgroundColor: brand.packageColor }}
          >
            {brand.name.slice(0, 2).toUpperCase()}
          </span>
          <span className="text-sm font-black uppercase tracking-normal text-slate-600">
            Фото скоро появится
          </span>
        </div>
      </button>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`overflow-hidden bg-slate-100 ${className}`}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        onError={() => setFailed(true)}
      />
    </button>
  );
}

export default ProductImage;
