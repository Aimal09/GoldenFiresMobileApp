// src/assets/Mock/docketOptions.ts

interface SupplierOption {
    value: string;
    name: string;
}

interface VarietyOption {
    value: string;
    name: string;
}

interface DocketTypeData {
    suppliers: SupplierOption[];
    varieties: VarietyOption[];
}

interface DocketOptions {
    [key: string]: DocketTypeData;
}

export const docketOptions: DocketOptions = {
    "Potato Docket": {
        suppliers: [
            { value: "1", name: "Smith Potato Farms" },
            { value: "2", name: "Green Valley Produce" },
            { value: "3", name: "Highland Potato Co" },
            { value: "4", name: "Farm Fresh Potatoes" }
        ],
        varieties: [
            { value: "1", name: "Russet" },
            { value: "2", name: "Red" },
            { value: "3", name: "White" },
            { value: "4", name: "Gold" }
        ]
    },
    "Oil Docket": {
        suppliers: [
            { value: "1", name: "Pure Oil Solutions" },
            { value: "2", name: "Golden Oil Co" },
            { value: "3", name: "Premium Oils" }
        ],
        varieties: [
            { value: "1", name: "Vegetable Oil" },
            { value: "2", name: "Canola Oil" },
            { value: "3", name: "Sunflower Oil" }
        ]
    },
    "Carton Docket": {
        suppliers: [
            { value: "1", name: "Box & Package Co" },
            { value: "2", name: "Carton Solutions" },
            { value: "3", name: "Premium Packaging" }
        ],
        varieties: [
            { value: "1", name: "Small Box" },
            { value: "2", name: "Medium Box" },
            { value: "3", name: "Large Box" },
            { value: "4", name: "Custom Size" }
        ]
    },
    "General Docket": {
        suppliers: [
            { value: "1", name: "General Supplies Inc" },
            { value: "2", name: "Basic Materials Co" },
            { value: "3", name: "Multi Supply Solutions" }
        ],
        varieties: [
            { value: "1", name: "Cleaning Supplies" },
            { value: "2", name: "Office Materials" },
            { value: "3", name: "Kitchen Supplies" },
            { value: "4", name: "Maintenance Items" }
        ]
    }
};