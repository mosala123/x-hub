import React from "react";
import "./Styles.css";

const Styles = () => {
  const styleCategories = [
    {
      id: 1,
      name: "Casual",
      image: "/gallery1.webp",
      size: "small",
      badge: "Everyday Wear"
    },
    {
      id: 2,
      name: "Formal",
      image: "/gallery2-removebg-preview.png",
      size: "large",
      badge: "Business & Office"
    },
    {
      id: 3,
      name: "Party",
      image: "/gallery3-removebg-preview.png",
      size: "large",
      badge: "Night Out"
    },
    {
      id: 4,
      name: "Gym",
      image: "/gallery4-removebg-preview.png",
      size: "small",
      badge: "Active Wear"
    }
  ];

  return (
    <div className="styles-section">
      <div className="styles-container">
        <div className="styles-card">
          <h1 className="styles-title">
            BROWSE BY <span>DRESS STYLE</span>
          </h1>

          <div className="styles-grid">
            {/* First Row */}
            <div className="styles-row">
              {styleCategories.slice(0, 2).map((style) => (
                <article 
                  key={style.id} 
                  className={`style-card ${style.size === 'small' ? 'casual' : 'formal'}`}
                >
                  <div className="card-content">
                    <h2>{style.name}</h2>
                  </div>
                  <div className="card-image">
                    <img
                      src={style.image}
                      alt={style.name}
                      loading="lazy"
                    />
                    <div className="image-overlay"></div>
                  </div>
                  <span className="card-badge">{style.badge}</span>
                </article>
              ))}
            </div>

            {/* Second Row */}
            <div className="styles-row">
              {styleCategories.slice(2, 4).map((style) => (
                <article 
                  key={style.id} 
                  className={`style-card ${style.size === 'small' ? 'gym' : 'party'}`}
                >
                  <div className="card-content">
                    <h2>{style.name}</h2>
                  </div>
                  <div className="card-image">
                    <img
                      src={style.image}
                      alt={style.name}
                      loading="lazy"
                    />
                    <div className="image-overlay"></div>
                  </div>
                  <span className="card-badge">{style.badge}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Styles;