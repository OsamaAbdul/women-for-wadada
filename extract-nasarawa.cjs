const data = require('nigeria-inec-geo');
const fs = require('fs');

// 1. Find Nasarawa state
const states = data.states();
const nasarawa = states.find(s => s.name === 'NASARAWA');

if (!nasarawa) {
  console.error("Nasarawa state not found!");
  process.exit(1);
}

// 2. Find all LGAs for Nasarawa
const lgas = data.lgas().filter(l => l.state_code === nasarawa.code);
console.log("Found LGAs:", lgas.length);

// 3. Find all Wards and PUs
const wards = data.wards();
const pollingUnits = data.pollingUnits();

const result = {
  state: nasarawa,
  lgas: lgas.map(lga => {
    const lgaWards = wards.filter(w => w.lga_code === lga.code && w.state_code === nasarawa.code).map(ward => {
      const puList = pollingUnits.filter(pu => pu.ward_code === ward.code && pu.lga_code === lga.code && pu.state_code === nasarawa.code).map(pu => {
         return { name: pu.name, code: pu.code, full_code: pu.full_code };
      });
      return {
         name: ward.name,
         code: ward.code,
         pollingUnits: puList
      };
    });
    
    return {
      name: lga.name,
      code: lga.code,
      wards: lgaWards
    };
  })
};

fs.writeFileSync('./src/data/nasarawa-locations.json', JSON.stringify(result, null, 2));
console.log("Done extracting locations. Saved to src/data/nasarawa-locations.json");
