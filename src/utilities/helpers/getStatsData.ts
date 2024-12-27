import reportStore from "@/store/reports";
import { Headers } from "@/constants";

const getStatsData = async () => {
    const endpoints = ["/v1/tenders", "/v1/vendors", "/v1/fx", "/v1/bids/bid-placement", "/v1/fx/fetch-fx-bid-placement"];
    const requests = endpoints.map(endpoint => fetch(`${process.env.API_ENDPOINT}${endpoint}`, { headers: Headers }));
    const [resTender, resVendor, fxBids, bidPlacementData, fxBidPlacementData] = await Promise.all(requests);

    const [tenders, vendors, fxbids, bidPlacement, fxBidPlacement] = await Promise.all([resTender.json(), resVendor.json(), fxBids.json(), bidPlacementData.json(), fxBidPlacementData.json()]);

    const tenderExpiringSoon = async () => {
        const currentDate = new Date();
        const twoWeeksFromNow = new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000);
        return tenders.filter(tender => {
            const tenderEndDate = new Date(tender.endDate);

            if (tenderEndDate < currentDate) {
                return null
            }
            return tenderEndDate < twoWeeksFromNow;
        });
    };

    const acceptedBidsCount = bidPlacement.data.filter(item => item.status === "accepted").length;
    const rejectedBidsCount = bidPlacement.data.filter(item => item.status === "rejected").length;
    const totalTender = tenders.length;
    const totalVendor = vendors.filter((item) => item?.user?.role === 'user')?.length;
    const activeTenders = tenders.filter(item => item.status === "open");
    const verifiedVendors = vendors.filter(item => (item.user.verified === true && item?.user?.role === 'user'));
    const activeTenderCount = activeTenders.length;
    const verifiedVendorsCount = verifiedVendors.length;
    const activeNoBid = 0;
    const totalBids = bidPlacement.data.length;

    const data = { totalTender, totalVendor, activeTenderCount, verifiedVendorsCount, activeNoBid, vendors, tenders, fxbids, bidPlacement, acceptedBidsCount, rejectedBidsCount, tenderExpiringSoon, totalBids };

    const fxData = { data: fxbids.data, bids: fxBidPlacement };

    //set the reports data
    reportStore.getState().$setReports({ totalTender, totalVendor, activeTenderCount, verifiedVendorsCount, activeNoBid, vendors, tenders, fxbids, bidPlacement, acceptedBidsCount, rejectedBidsCount, tenderExpiringSoon, totalBids });
    return {
        data,
        fxData
    };
}

export {
    getStatsData
}