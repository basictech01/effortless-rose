"use client";
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation'
import { SECRET_KEY } from '../utils/constant';
import hmacSHA512 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';

function RoseView() {
  const searchParams = useSearchParams();
  const [roseData, setRoseData] = React.useState({
    name: '',
    message: '',
    difficulty: 0
  });
  const [error, setError] = React.useState<string | null>(null);  
  
  React.useEffect(() => {
    let hash = searchParams.get('hash');
    hash = decodeURIComponent(hash || '');
    try {

    if (hash) {
        const parsed  = hash.split('.');
        if (parsed.length !== 2) {
          setError('Looks like someone is trying to trick you');
          return;
        }
        const base64EncodedData = parsed[0];
        const signature = parsed[1];
        const data = atob(base64EncodedData);
        const verifySignature = Base64.stringify(hmacSHA512(data, SECRET_KEY));
        if (signature !== verifySignature) {
          setError('Looks like someone is tying to take easy way out');
          return;
        }
        const decoded = JSON.parse(data);
        if (!decoded.name || !decoded.message || !decoded.difficulty) {
          setError('Looks like someone is tying to take easy way out');
          return;
        }
        setRoseData(decoded);
      } else {
        setError('Looks like someone is tying to take easy way out');
      }
    } catch (e) {
      setError('Looks like someone is tying to take easy way out');
      console.error(e);
    }
  }, [searchParams]);

  function getPlacementPoints(itemCount: number, stickLength = 200) {
    if (itemCount <= 0) return [];
    
    const gap = stickLength / (itemCount + 1);
    let positions = [];
    
    for (let i = 0; i < itemCount; i++) {
        positions.push((i + 1) * gap);
    }
    positions = positions.map((pos) => pos + 80);
    return positions;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 to-pink-200 py-16 px-4">
      
      {/* Rose positioned above the card */}
        <div className="relative flex justify-center mb-12">
          <div className="relative w-32 h-48">
            <div className="container absolute -top-12 left-1/2 transform -translate-x-1/2">
              <div className="glass"></div>
              <div className="thorns absolute">

                {getPlacementPoints(roseData.difficulty).map((top, index) =>  {
                  if((index + 1) % 2 == 0) {
                    return (
                      <div key={index} className='thorns-left'  style={{ top: `${top}px` }}></div>
                    )
                  } else {
                    return (
                      <div key={index} className='throne-right' style={{ top: `${top}px` }}></div>
                    )
                  }
                })
                }
              </div>
              <div className="glow"></div>
              <div className="rose-leaves flex justify-center">
                <div></div>
                <div></div>
              </div>
              <div className={error ? "rose-petals-black flex justify-center" : "rose-petals flex justify-center"}>
                {Array(7).fill(null).map((_, i) => <div key={i}></div>)}
              </div>
              <div className="sparkles absolute inset-0 flex justify-center items-center">
                {Array(10).fill(null).map((_, i) => <div key={i}></div>)}
              </div>
            </div>
          </div>
        </div>

      {/* Card content */}
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">A Rose For You {roseData.name} </h1>
        
        <div className="space-y-4 mb-8">
          {error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <>
            </>
          )}
        </div>

        {/* Display Rose Emojis Based on Difficulty */}
        {!error && (
          <div className="inline-flex items-center justify-center space-x-2 text-rose-600 text-2xl">

              <span>{roseData.message}</span>
          </div>
        )}
      </div>

    </div>
  );
}


export default function Page() { // Wrap in a Suspense boundary
  return (
    <Suspense fallback={<p>Loading...</p>}>  {/* Display while data is fetching */}
      <RoseView />
    </Suspense>
  );
}
