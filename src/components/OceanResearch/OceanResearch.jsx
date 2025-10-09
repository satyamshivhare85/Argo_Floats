import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './OceanResearch.css'; 

const OceanResearch = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="research-article-container">
      {/* ✨ --- STYLE BLOCK TO MAKE THE PAGE FULL WIDTH --- ✨ */}
      <style>{`
        .research-article-container {
          /* Make the container full-width and set the background */
          width: 100%;
          min-height: 100vh;
          background-color: #0f172a; /* Dark slate blue from your theme */
          color: #e2e8f0;           /* Light text for readability */
          padding: 2rem 1.5rem;      /* Add some spacing around the content */
          box-sizing: border-box;
        }

        /* Keep the actual article content centered and readable */
        .research-article-container > .article-header,
        .research-article-container > .article-body,
        .research-article-container > .related-articles-section {
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>

      <div className="article-header">
        <Link to="/" className="back-to-home-link">
          <FaArrowLeft />
          <span>Back to Home</span>
        </Link>
        
        <p className="article-meta">
          <span>ARGO DATA IN ACTION</span> 
          <span>OCEAN SCIENCE</span> 
          <span>SUSTAINABILITY</span>
        </p>
        <h1 className="article-title">
          Data and the Deep Sea: 4 Ways Argo Data Empowers Marine Biologists
        </h1>
        <p className="article-subtitle">
          From microscopic plankton to global climate patterns, discover how real-time data from the Argo float network is revolutionizing our ability to understand and protect the oceans.
        </p>
      </div>

      <div className="article-body">
        <p>
          Rigorous data collection and analysis are essential for developing solutions that reduce the stressors our coastal and marine ecosystems face. Organizations across the globe, from nonprofits to governments, are calling for new policies based on a solid foundation of scientific evidence—the very evidence provided by the Argo program. Here are four crucial ways marine biologists and oceanographers are using Argo data to create healthier, more sustainable marine environments.
        </p>
        
        <div className="article-section">
          <h2>1. Understanding the Ocean's Inhabitants and Ecosystems</h2>
          <p>
            From sustainable aquaculture to the health of plankton populations, every component of our ocean’s biodiversity is part of an integrated ecosystem. Marine biologists are closer than ever to understanding these intricate details, thanks to the holistic data provided by Argo floats. This data covers everything from water column temperature and salinity, which dictates species distribution, to the physical dynamics that drive marine mammal migration patterns. Researchers using our platform can develop a broad spectrum of field-based research skills by working with original, real-time oceanographic data.
          </p>
        </div>

        <div className="article-section">
          <h2>2. Monitoring and Predicting Climate Change Impacts</h2>
          <p>
            The ocean has absorbed over 90% of the excess heat from greenhouse gas emissions. Argo floats are on the front lines, measuring this change with unprecedented accuracy. By tracking Ocean Heat Content (OHC), scientists can directly quantify the Earth's energy imbalance. This data is critical for refining climate models, predicting the intensity of marine heatwaves that lead to coral bleaching, and understanding how warming affects vital ocean currents. Accessing this data allows researchers to contribute directly to the global understanding of climate change.
          </p>
        </div>

        <div className="article-section">
          <h2>3. Improving Fisheries Management and Sustainability</h2>
          <p>
            Sustainable fisheries depend on a healthy marine environment. Argo data on temperature, salinity, and dissolved oxygen levels helps scientists model the habitats of commercially important fish species. By understanding where these species are likely to thrive or decline due to changing ocean conditions, policymakers can create more effective fishing regulations, establish dynamic marine protected areas (MPAs), and prevent overfishing. This ensures the long-term viability of both the ecosystem and the fishing industry.
          </p>
        </div>

        <div className="article-section">
          <h2>4. Advocating for Evidence-Based Global Policy</h2>
          <p>
            The efforts of individual marine scientists can only go so far. As our understanding of the world's ecosystems evolves, global policies must adapt. Argo data provides the foundational evidence for major international initiatives, such as the U.N.'s <a href="https://www.oceandecade.org/" target="_blank" rel="noopener noreferrer">Decade of Ocean Science for Sustainable Development</a>. Marine biologists play an essential role in interpreting this data to identify and evaluate key policies that can affect the long-term health of marine habitats, ensuring humanity can change course and create a healthier ocean environment.
          </p>
        </div>
      </div>
      
      <div className="related-articles-section">
        <h3 className="related-title">You may also find interesting</h3>
        <div className="related-articles-grid">
          
          <div className="related-article-card">
            <Link to="/climate-monitoring">
              <div className="card-image-wrapper">
                <img 
                  src="https://www.globaltechcouncil.org/wp-content/uploads/2024/12/Role-of-AI-in-Climate-Monitoring.webp" 
                  alt="A large glacier calving into the ocean"
                  className="card-image"
                />
              </div>
              <div className="card-content">
                <p className="related-meta">JANUARY 02, 2025</p>
                <h4 className="related-article-title">What Is Climate Monitoring? 5 Key Indicators...</h4>
              </div>
            </Link>
          </div>
          
          <div className="related-article-card">
            <Link to="/weather-forecasting">
              <div className="card-image-wrapper">
                <img 
                  src="https://tse2.mm.bing.net/th/id/OIP.LzY3QcFuSPiD81ZwbfA_twHaFJ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" 
                  alt="Satellite view of a hurricane over the ocean"
                  className="card-image"
                />
              </div>
              <div className="card-content">
                <p className="related-meta">DECEMBER 06, 2024</p>
                <h4 className="related-article-title">How Ocean Data Improves Hurricane Forecasts</h4>
              </div>
            </Link>
          </div>

          <div className="related-article-card">
             <Link to="/map">
               <div className="card-image-wrapper">
                 <img 
                   src="https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=1974&auto=format&fit=crop" 
                   alt="Abstract digital world map with glowing data points"
                   className="card-image"
                 />
               </div>
               <div className="card-content">
                 <p className="related-meta">OCTOBER 18, 2024</p>
                 <h4 className="related-article-title">Exploring the Global Argo Float Network</h4>
               </div>
             </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default OceanResearch;