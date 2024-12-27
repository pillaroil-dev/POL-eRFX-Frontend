import type { APIRoute } from "astro";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const POST: APIRoute = async ({request}) => {
    let x_pol_rfx_secret = process.env.X_POL_RFX_SECRET;
    request.headers.set("x-pol-rfx-secret", `${x_pol_rfx_secret}`);

    const generateRandomPassword = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+?><:{}[]";
        let password = "";
        for (let i = 0; i < 10; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    };

    // Generate a salt for hashing passwords
    const salt = bcrypt.genSaltSync(10);

    const pass = generateRandomPassword();


    const payload = [
        {
            "HomePhone": "08062454503",
            "BusinessPhone": "01-4544667",
            "EmailAddress": "info@aprosolnig.com",
            "Company": "Absolute Project Solution Company Nigeria Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08027411332",
            "EmailAddress": "info@acteonproject.com",
            "Company": "Acteon Project Service Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08066740673",
            "EmailAddress": "alfainspection55@gmail.com",
            "Company": "Alfa Designs Nigeria Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08071024458",
            "EmailAddress": "info@amaydiriprint.com",
            "Company": "Amaydiri Impressions Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08037063076",
            "EmailAddress": "info@annssa.com",
            "Company": "Annssa Worldwide Solution Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "09060000471",
            "EmailAddress": "info@ardrend.com",
            "Company": "Ardrend Limited"
        },
        {
            "HomePhone": "07052832190",
            "BusinessPhone": "01-291000",
            "EmailAddress": "info@ariltechnologies.com",
            "Company": "Aril Technologies Limited"
        },
        {
            "HomePhone": "08039787103",
            "BusinessPhone": "08057099966",
            "EmailAddress": "equiry@atlanticbluewater.com",
            "Company": "Atlantic Bluewater Services Ltd"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08033361389",
            "EmailAddress": "info@autoskada.com",
            "Company": "Autoskada Technologies Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": null,
            "EmailAddress": "info@beam-energy.com",
            "Company": "Beam Energy Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08124061603",
            "EmailAddress": "benjudewestafricaltd@yahoo.com",
            "Company": "Ben-Jude West Africa Ltd"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08104056476",
            "EmailAddress": "info@bicens.com",
            "Company": "BICENS Resources Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08033589333",
            "EmailAddress": "bisalo2002@yahoo.com",
            "Company": "Bisalo Electrical Works"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "01 2917376",
            "EmailAddress": "botrosteel@gmail.com",
            "Company": "Botro Steel Fze"
        },
        {
            "HomePhone": "08067160371",
            "BusinessPhone": "08076138639",
            "EmailAddress": "info@brenhazylimited.com",
            "Company": "Brenhazy Limited"
        },
        {
            "HomePhone": "08029528380",
            "BusinessPhone": "08097187768",
            "EmailAddress": "broadlogltd@gmail.com",
            "Company": "Broadlog Support Services Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08189405501",
            "EmailAddress": "info@buskem.com",
            "Company": "Buskem Engineering & Consultancy Nig Ltd"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "+23484780595",
            "EmailAddress": "info@candixnigeria.com",
            "Company": "Candix Engineering Nigeria Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "01-6280566",
            "EmailAddress": "lagos@cares-group.com",
            "Company": "Cares Nigeria"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "09093289986",
            "EmailAddress": "info@centdoor.com",
            "Company": "Centdoor Energy Services Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "09019003000",
            "EmailAddress": "hello@centexia.com",
            "Company": "Centexia Technical Services Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08055426361",
            "EmailAddress": "info@ce-stalong.com",
            "Company": "CE-Stalong Resources Ltd"
        },
        {
            "HomePhone": "09087715466",
            "BusinessPhone": null,
            "EmailAddress": "info@chesroc.com",
            "Company": "Chesroc Nigeria Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "Incorrect",
            "EmailAddress": "chiblaze1234@gmail.com",
            "Company": "Chizitelu Bryan & Company Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "01 – 4629502",
            "EmailAddress": "crestech@crestechengineering.com",
            "Company": "Crestech Engineering Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": null,
            "EmailAddress": "info@daqc.biz",
            "Company": "DAQC Field & Well Services Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "07039371517",
            "EmailAddress": "info@dodageoenergy.com",
            "Company": "Dodageo Integrated Energy Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "07034748793",
            "EmailAddress": "consulting@dovaheights.com",
            "Company": "Dovaheights Energy Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "07034175857",
            "EmailAddress": "drillogp@drillogpdl.com",
            "Company": "Drillog Petro-Dynamics Ltd"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08103639712",
            "EmailAddress": "info@ehimatieglobal.com",
            "Company": "Ehimatie Global Resources Ltd"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08023018700",
            "EmailAddress": "ellaleonltd@gmail.com",
            "Company": "Ellaleon Ventures Ltd"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08115618888",
            "EmailAddress": "tender@emval.net",
            "Company": "Emval Nigeria Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": null,
            "EmailAddress": "info@epcmengineers.com",
            "Company": "EPCM Engineers Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08032440092",
            "EmailAddress": "eraxfdtns2009@yahoo.com",
            "Company": "Erax Technical Services Ltd"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08127058472",
            "EmailAddress": "essg_bide@yahoo.com",
            "Company": "Essg-Bide Nig. Ltd"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "01-4612476",
            "EmailAddress": "info@eunisell.com",
            "Company": "Eunisell Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08035502874",
            "EmailAddress": "fgoken2017@gmail.com",
            "Company": "F.Goken Nig Limited"
        },
        {
            "HomePhone": "08099542111",
            "BusinessPhone": "08068223540",
            "EmailAddress": "info@fairtex.com.ng",
            "Company": "Fairtex Integrated Services Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "07034196696",
            "EmailAddress": "dele.adeside@faithworthenergy.com",
            "Company": "Faithworth Energy Ltd"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08099926165",
            "EmailAddress": "info@fawthritelimited.com",
            "Company": "Fawthrite Nigeria Limited"
        },
        {
            "HomePhone": "08022234297",
            "BusinessPhone": "08022249999",
            "EmailAddress": "felpetsales@felpet.com",
            "Company": "Felbet  Nigeria Limited"
        },
        {
            "HomePhone": "08030969800",
            "BusinessPhone": "08035983345",
            "EmailAddress": "info@federgo.net",
            "Company": "Ferdergo Enginnering Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "01-2776123",
            "EmailAddress": "fus@forteoilplc.com",
            "Company": "Forte Upstream Services Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "09055858131",
            "EmailAddress": "adesuap@futureoilfields.com",
            "Company": "Future Oilfield Services Limited (FOSL)"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "09090260055",
            "EmailAddress": "info@gcaenergy.com",
            "Company": "GCA Energy Limited"
        },
        {
            "HomePhone": "08034012002",
            "BusinessPhone": null,
            "EmailAddress": "support@gennesaretresources.com",
            "Company": "Gennesaret Resources Nigeria Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08112321111",
            "EmailAddress": "info@gentec.ng; eferire.uto@gentec.ng",
            "Company": "Gentec Engineering Limited"
        },
        {
            "HomePhone": "08037157731",
            "BusinessPhone": "084550115",
            "EmailAddress": "mail@geomarinesystems.net",
            "Company": "Geomarine Systems Limited"
        },
        {
            "HomePhone": "08035457007",
            "BusinessPhone": "08098880997",
            "EmailAddress": "info@geospectraengineering.com",
            "Company": "Geosepectra Engineering Services & Consultants Ltd"
        },
        {
            "HomePhone": "08187333239",
            "BusinessPhone": "08187333436",
            "EmailAddress": "info@gladexltd.com; gladexltd@yahoo.com",
            "Company": "Gladex Dynamic Resources Ltd"
        },
        {
            "HomePhone": "08039323276",
            "BusinessPhone": "08034081166",
            "EmailAddress": "contact@globalspectrumplc.com",
            "Company": "Global Spectrum Energy Services Plc"
        },
        {
            "HomePhone": "07045047041",
            "BusinessPhone": "08033401960",
            "EmailAddress": "sales@gcil.biz; procurement@gcil.biz",
            "Company": "Goddie Chemicals International Limited"
        },
        {
            "HomePhone": "012957854",
            "BusinessPhone": "012957853",
            "EmailAddress": "info@goshenservicesgroup.com",
            "Company": "Goshen Integrated Supplies, Limited"
        },
        {
            "HomePhone": "08124679549",
            "BusinessPhone": "01-7001380",
            "EmailAddress": "info@gremoore.com",
            "Company": "Gremoore Limited"
        },
        {
            "HomePhone": "07056655896",
            "BusinessPhone": "08167716344",
            "EmailAddress": "support@handsonfacilityng.com",
            "Company": "Hands On Facility Nigeria Limited"
        },
        {
            "HomePhone": "08057292854",
            "BusinessPhone": "08039253554",
            "EmailAddress": "havicintegratedltd@gmail.com",
            "Company": "Havic Integrated Resource Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08099500695",
            "EmailAddress": "aquaearthconsulting@hotmail.com",
            "Company": "HD Aquaearth Consulting Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "07037995315",
            "EmailAddress": "info@henisspringngr.com",
            "Company": "Henis -Spring Logistics Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "01-6321100-5",
            "EmailAddress": "info@homble-energy.com",
            "Company": "Homble Energy Services Limited"
        },
        {
            "HomePhone": "09037029003",
            "BusinessPhone": "07061337780",
            "EmailAddress": "admin@hydroserveng.com",
            "Company": "Hydroserve Oil Services Nigeria Limited"
        },
        {
            "HomePhone": "08067248264",
            "BusinessPhone": "01-6310458",
            "EmailAddress": "info@igpesgroup.com",
            "Company": "IGPES Gas & Power Limited"
        },
        {
            "HomePhone": "08032518491",
            "BusinessPhone": null,
            "EmailAddress": "info@indexproltd.com",
            "Company": "Indexpro Int'l Services"
        },
        {
            "HomePhone": "08025755240",
            "BusinessPhone": "09058050796",
            "EmailAddress": "info@ifdcconsulting.com",
            "Company": "Integrated Field Development Consultants Ltd (IFDC)"
        },
        {
            "HomePhone": "08168483079",
            "BusinessPhone": "07036858814",
            "EmailAddress": "info@jg-engineering.net",
            "Company": "J & G Engineering and Constuction Services Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08034399531",
            "EmailAddress": "info@jbsynergyng.com",
            "Company": "JB Synergy Ltd"
        },
        {
            "HomePhone": "08076291608",
            "BusinessPhone": "08057007225",
            "EmailAddress": "info@jcinternationalng.com",
            "Company": "JC International Limited"
        },
        {
            "HomePhone": "08057165470\r\n08152200020",
            "BusinessPhone": "08035350087",
            "EmailAddress": "tedogroup@gmail.com",
            "Company": "Joola Ventures Overseas Ltd"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08023168465",
            "EmailAddress": "juchekanigeria@rocketmail.com",
            "Company": "Jucheka Resources Nigeria Limited"
        },
        {
            "HomePhone": "07086610287",
            "BusinessPhone": "08033165857",
            "EmailAddress": "info@korentwellhead.com",
            "Company": "Korent Services Nigeria Limited"
        },
        {
            "HomePhone": "08051449797",
            "BusinessPhone": "08037259011",
            "EmailAddress": "info@kurusu.com.ng",
            "Company": "Kurusu and Associated Industries Limited"
        },
        {
            "HomePhone": "08073990643",
            "BusinessPhone": "08078817422",
            "EmailAddress": "info@laser-ng.com",
            "Company": "Laser Engineering & Resources Consultants Limited"
        },
        {
            "HomePhone": "08033820487",
            "BusinessPhone": null,
            "EmailAddress": "lexusoilltd@yahoo.com",
            "Company": "Lexus Oil & Gas Ltd"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08063795283",
            "EmailAddress": "info@loitte.com",
            "Company": "Loitte Engineering Ltd"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08034276231",
            "EmailAddress": "lucianoenergylimited@yahoo.com",
            "Company": "Luciano Engineering Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08166680333",
            "EmailAddress": "mmarinaltd@gmail.com",
            "Company": "Maleoh Marina Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08055661921",
            "EmailAddress": "info@masije.com",
            "Company": "Masije Oil & Intergrated Services"
        },
        {
            "HomePhone": "08112020002",
            "BusinessPhone": null,
            "EmailAddress": "info@maxupstream.com",
            "Company": "Max Upstream Limited"
        },
        {
            "HomePhone": "08029998421",
            "BusinessPhone": "0901900200",
            "EmailAddress": "info@mckianenergy.com",
            "Company": "Mckian Energy Solutions Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "0806418022",
            "EmailAddress": "management@group.ng",
            "Company": "MJD Oilfield Services Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "01-4633162",
            "EmailAddress": "c.emezue@montego-holdings.com",
            "Company": "Montego Upstream Service Ltd"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08036117008",
            "EmailAddress": "info@moshenergy.com.ng",
            "Company": "Mosh Energy Services Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "07061953202",
            "EmailAddress": "jjahdinsue@yahoo.com",
            "Company": "Moss Fire Safety Protection Services Nig. Ltd"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "07080882286",
            "EmailAddress": "info@mountainsenergysolution.com.ng",
            "Company": "Mountain Energy Solution Ltd"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "01-4605467; 01-4610821",
            "EmailAddress": "info@multitechng.com",
            "Company": "Multinational Technologies Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08084350000",
            "EmailAddress": "info@munarchiltd.com",
            "Company": "Munarchi Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08076291657",
            "EmailAddress": "delivery@oilfieldsolutions-ng.com",
            "Company": "Oilfield Solution Limited"
        },
        {
            "HomePhone": "07056186609",
            "BusinessPhone": "08063287727",
            "EmailAddress": "orismaenergy@yahoo.com",
            "Company": "Orisma Energy Concept Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "01-2900629",
            "EmailAddress": "info@owel-linkso.com",
            "Company": "Owel-Linkso Nigeria Limited"
        },
        {
            "HomePhone": "08027464143",
            "BusinessPhone": "08142726641",
            "EmailAddress": "trumphheavens@yahoo.com",
            "Company": "Oyagha Global Service Ltd"
        },
        {
            "HomePhone": "08058279508",
            "BusinessPhone": "08035510891",
            "EmailAddress": "petrosearchcomltd@yahoo.com",
            "Company": "Petrosearch Co. limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08033102845",
            "EmailAddress": "info@pimoservices.com",
            "Company": "Pimo Services Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08033090485",
            "EmailAddress": "info@power-system-solutions.com",
            "Company": "Power System and Automation Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08063925322",
            "EmailAddress": "info@premiovin.com",
            "Company": "Premiovin Solutions Nigeria Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08032949646",
            "EmailAddress": "info@prudialtd.com",
            "Company": "Prudia Limited"
        },
        {
            "HomePhone": "08027442752",
            "BusinessPhone": "08033441816",
            "EmailAddress": "sales@purimengineering.com",
            "Company": "Purim Engineering & Construction Co. Ltd"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "07060626135",
            "EmailAddress": "q.ozeh@yahoo.com",
            "Company": "Q.Ozeh Nigeria Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08033193339",
            "EmailAddress": "nratessy@yahoo.com",
            "Company": "RA-TESSY Nigeria Ltd"
        },
        {
            "HomePhone": "08022242975",
            "BusinessPhone": "01-2713405",
            "EmailAddress": "info@richardson-oilandgas.com",
            "Company": "Richardson Oil & Gas Limited"
        },
        {
            "HomePhone": "08106811101",
            "BusinessPhone": null,
            "EmailAddress": "info@riglogserv.com",
            "Company": "Riglog Services Limited"
        },
        {
            "HomePhone": "08033330991",
            "BusinessPhone": "07064189286",
            "EmailAddress": "surendra@romsonphc.com",
            "Company": "Romson Oil Field Services Limited"
        },
        {
            "HomePhone": "09290000091",
            "BusinessPhone": "08073777798",
            "EmailAddress": "info@roviconenergys.com",
            "Company": "Rovicon Energy Services Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "09092358932",
            "EmailAddress": "info@sbtpetroleum.com.ng",
            "Company": "SBT Petroleum Geoscience Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08027728321",
            "EmailAddress": "shamarenergyltd@gmail.com",
            "Company": "Shamar Energy Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "070340061057",
            "EmailAddress": "mena.tueje@shelltrustinternational.com",
            "Company": "Shelltrust International Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "09055858131",
            "EmailAddress": "oluwatosin@sigmundgroup.com",
            "Company": "Sigmund Engineering Works Limited"
        },
        {
            "HomePhone": "08158084184",
            "BusinessPhone": "08038761784",
            "EmailAddress": "info@sixteroglobalservices.com",
            "Company": "Sixtero Global Services Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08095949429",
            "EmailAddress": " admin@swoilfield.com",
            "Company": "South Western Technologies & Oilfield Services Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08103038725",
            "EmailAddress": "bdu@sowsco.net",
            "Company": "SOWSCO Well Services Nig Ltd"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08037374928",
            "EmailAddress": "info@spintegrated.com",
            "Company": "SP Integrated Oil Field & Marine Services Nigeria Limited"
        },
        {
            "HomePhone": "08025880262",
            "BusinessPhone": "08052721626",
            "EmailAddress": "samuelanugengen@gmail.com",
            "Company": "Spatbral Engineering Servics Limited"
        },
        {
            "HomePhone": "08034962361",
            "BusinessPhone": "08033325962; ",
            "EmailAddress": "info@staroffshoreng.com",
            "Company": "Star Offshore Energy Nigeria Limited"
        },
        {
            "HomePhone": "08025806547",
            "BusinessPhone": "08145047121",
            "EmailAddress": "info@strucmarine.com",
            "Company": "Strucmarine Engineering Limited"
        },
        {
            "HomePhone": "08023052646",
            "BusinessPhone": null,
            "EmailAddress": "tegas.eng.co.ltd@gmail.com",
            "Company": "Tegas Engineering Company limited"
        },
        {
            "HomePhone": "01-4617041-2",
            "BusinessPhone": "07035214310",
            "EmailAddress": "opbassey-okon@total.com.ng",
            "Company": "Total Nigeria Plc"
        },
        {
            "HomePhone": null,
            "BusinessPhone": null,
            "EmailAddress": "info@trexm.com",
            "Company": "Trexm Oil & Gas Services Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08032720641",
            "EmailAddress": "info@tridentng.com",
            "Company": "Trident Oil & Gas Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08032679974",
            "EmailAddress": "jizzi@troikainvestment.com",
            "Company": "Troika Investment Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "09056850918",
            "EmailAddress": "unionenergy@unionenergyng.com",
            "Company": "Union Energy Services Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08034120293",
            "EmailAddress": "universallogisticxlagos@gmail.com",
            "Company": "Universal Logistics & Haulage Services Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08038829855",
            "EmailAddress": "valentine.emeh@vounoil.com",
            "Company": "Voun Oilfield Services Limited"
        },
        {
            "HomePhone": "09087191495",
            "BusinessPhone": "01-2710560; 012799215",
            "EmailAddress": "info@vuringroup.com",
            "Company": "Vurin Group"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08064054001",
            "EmailAddress": "info@zalesmarvel.com",
            "Company": "Zales & Mavel International Company Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08119999979",
            "EmailAddress": "info@zdxenergy.com",
            "Company": "ZDX Energy Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "09093840704",
            "EmailAddress": "ikeh.ifeoma@ziusspowerng.com",
            "Company": "Ziuss Energy and Power Limited"
        },
        {
            "HomePhone": "07066911568",
            "BusinessPhone": null,
            "EmailAddress": "info@zytelimited.com",
            "Company": "Zyte Integrated Concept Ltd"
        },
        {
            "HomePhone": "08036578628",
            "BusinessPhone": "09059822656",
            "EmailAddress": "info@bluemalc.com",
            "Company": "Bluemalc Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08037039084",
            "EmailAddress": "info@wogallied.com",
            "Company": "WOG Allied Services "
        },
        {
            "HomePhone": "08064746483",
            "BusinessPhone": "08030848295",
            "EmailAddress": "info@ngofainspection.com",
            "Company": "Ngofa Inspection Services Limited"
        },
        {
            "HomePhone": "08129082971",
            "BusinessPhone": "08129083100-4",
            "EmailAddress": "info@brone-survey.com",
            "Company": "Brone Positioning & Survey Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08139377294",
            "EmailAddress": "expertproject2000@yahoo.com",
            "Company": "Expert Crystal Designs & Project Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08035480017",
            "EmailAddress": "bgtsales@bgtechnical.com",
            "Company": "B.G Technical Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "01-2956126",
            "EmailAddress": "victor.ilofuan@eppl.com.ng",
            "Company": "EOS Procurement & Projects Limited"
        },
        {
            "HomePhone": "08037207869",
            "BusinessPhone": "08055549462",
            "EmailAddress": "info@i2iservices.com",
            "Company": "i2i Energy Resources Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08033126078",
            "EmailAddress": "pssengineeringphc@gmail.com",
            "Company": "PSS Engineering & Construction (Nig) Limited"
        },
        {
            "HomePhone": "08061248636",
            "BusinessPhone": "08098557900",
            "EmailAddress": "info@speevotechnologies.com",
            "Company": "Speevo Technologies Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08023030995",
            "EmailAddress": "info@sigmauniversalng.com",
            "Company": "Sigma Universal Nigeria Limited"
        },
        {
            "HomePhone": "08034022427",
            "BusinessPhone": "01-8446125",
            "EmailAddress": "info@petroequipmentlogistics.com",
            "Company": "Petro Equipment Logistics"
        },
        {
            "HomePhone": "07086713812",
            "BusinessPhone": "09099559577",
            "EmailAddress": "info@fogng.com",
            "Company": "Fasaiah Oil & Gas Nigeria Limited"
        },
        {
            "HomePhone": "08068608092",
            "BusinessPhone": "8070646593",
            "EmailAddress": " rorayalrolex@yahoo.com",
            "Company": "Royal-Rolex Global Resources LTD"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08187117136",
            "EmailAddress": "info@nordic-degrees.com ",
            "Company": "Nordic Degrees Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "070123315888",
            "EmailAddress": " info@chisidaenergy.com",
            "Company": "Chisida Energy Services Limited"
        },
        {
            "HomePhone": "08037113415",
            "BusinessPhone": "08056747451",
            "EmailAddress": "Cohistechnical@gmail.com",
            "Company": "Cohis International Technical Services Limited"
        },
        {
            "HomePhone": "08023458549",
            "BusinessPhone": "08033835004",
            "EmailAddress": "globalresdev@yahoo.com",
            "Company": "Global Resources Development Company Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08068833171",
            "EmailAddress": "info@jenissiglobal.com ",
            "Company": "JENISSI GLOBAL VENTURES LIMITED"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08038508345",
            "EmailAddress": "operationsext@hydrotechpipingsystems.com",
            "Company": "HYDROTECH PIPING SYSTEMS (NIG) LTD"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08033389258",
            "EmailAddress": "theophilus.orupabo@petraservices-ng.com",
            "Company": "PETRA SERVICES LIMITED"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08166661489",
            "EmailAddress": "joeny2002@gmail.com",
            "Company": "Joeny Holdings Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "09030006707",
            "EmailAddress": "info@bradeafrica.com",
            "Company": "Brade Consulting Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08037272612",
            "EmailAddress": "accordanceenergyresourcesltd@gmail.com",
            "Company": "Accordance Energy Resourcre Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08099992480",
            "EmailAddress": "info@krisquest.com",
            "Company": "Kristquest Energy Services Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08033264519",
            "EmailAddress": "info@danvicsafetysolutions.com",
            "Company": "Danvic Petroleum International"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08034847444",
            "EmailAddress": "locvieltd@gmail.com",
            "Company": "Locvie Integrated Services Limited"
        },
        {
            "HomePhone": "08065779411",
            "BusinessPhone": "08142183675",
            "EmailAddress": "info@shiwinis.com",
            "Company": "Shiwins Integrated Services Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "07064172205",
            "EmailAddress": "info@amelinprojects.com",
            "Company": "Amelin Project Limited"
        },
        {
            "HomePhone": "08066683803",
            "BusinessPhone": "1-4543801",
            "EmailAddress": "info@ktsoilndgas.com",
            "Company": "KTS Oil & Gas Services Limited"
        },
        {
            "HomePhone": "07038537425",
            "BusinessPhone": "08052920018",
            "EmailAddress": "ehijesytechsl@gmail.com",
            "Company": "Ehijesy Technology Services Limited"
        },
        {
            "HomePhone": "08068885118",
            "BusinessPhone": "08034070366",
            "EmailAddress": "info@globaletcng.com",
            "Company": "Global Equipment Testing and Calibration Limited"
        },
        {
            "HomePhone": "08097823808",
            "BusinessPhone": "08069339343",
            "EmailAddress": "nowerox@yahoo.com",
            "Company": "Nowerox Nigeria Limited"
        },
        {
            "HomePhone": "07067333190",
            "BusinessPhone": "09030008674",
            "EmailAddress": "info@triumphpg.com",
            "Company": "Triumph Power & Gas Systems Limited"
        },
        {
            "HomePhone": "-8088000495",
            "BusinessPhone": null,
            "EmailAddress": "info@zakwaoilandgas.com",
            "Company": "Zakwa Oil & Gas limited"
        },
        {
            "HomePhone": "08030488617",
            "BusinessPhone": "08183392730",
            "EmailAddress": "info@tomsey.com.ng",
            "Company": "Tomsey Engineering and Services International Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "07034627158",
            "EmailAddress": "contactus@geekyexperts.com",
            "Company": "Geeky Experts Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "07019592066",
            "EmailAddress": "ephraimcontrolservices2021@gmail.com",
            "Company": "Ephraim Contrl Services Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08056970317",
            "EmailAddress": "Info@rit-bengineering.com",
            "Company": "Rit-Beulah Engineering Services Limited"
        },
        {
            "HomePhone": "084-464230-9",
            "BusinessPhone": "08058002329",
            "EmailAddress": "Sales@aosorwell.com ",
            "Company": "AOS Orwell Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08092830966",
            "EmailAddress": "info@saltaccl.com",
            "Company": "Salta Infrastructure and Construction Company Limited"
        },
        {
            "HomePhone": "09037321902",
            "BusinessPhone": null,
            "EmailAddress": "info@jamaxenergy.com",
            "Company": "Jamax Energy"
        },
        {
            "HomePhone": "07064449451",
            "BusinessPhone": null,
            "EmailAddress": "info@stowpoint.co.uk",
            "Company": "Stowpoint Services Limited"
        },
        {
            "HomePhone": "07067596838",
            "BusinessPhone": "07067596838",
            "EmailAddress": "dakotelin@yahoo.com",
            "Company": "Dakotelin Nigeria Limited"
        },
        {
            "HomePhone": null,
            "BusinessPhone": "08094902026",
            "EmailAddress": "sales@roidivin.com",
            "Company": "Roi Divin Limited "
        }
    ];

    // const fxPayload = [
    //     { "emailAddress": "vaganbi@msn.com", "firstName": "Valentine", "lastName": "Aganbi", "businessPhone": "" },
    //     { "emailAddress": "disunb@gmail.com", "firstName": "Disun", "lastName": "Braithwaite", "businessPhone": "" },
    //     { "emailAddress": "rabanum@gmail.com", "firstName": "Rabanum", "lastName": "", "businessPhone": "" },
    //     { "emailAddress": "kajayi@secureidltd.com", "firstName": "Kola", "lastName": "Ajayi", "businessPhone": "" },
    //     { "emailAddress": "evelynokogbe@yahoo.com", "firstName": "Evelyn", "lastName": "Okogbe", "businessPhone": "" },
    //     { "emailAddress": "osita.o@flyunitednigeria.com", "firstName": "Osita", "lastName": "O", "businessPhone": "" },
    //     { "emailAddress": "okwuiu@gmail.com", "firstName": "Okwui", "lastName": "Ubosi", "businessPhone": "" }
    // ];

    try {
        // Use a loop to create each user and their related contractor
        for (const { EmailAddress, Company, HomePhone, BusinessPhone } of payload) {
            // Hash the password using bcrypt
            const password = bcrypt.hashSync(pass, salt);
           const users = await prisma.user.create({
                data: {
                    email: EmailAddress,
                    password,
                    verified: true,
                    role: "user", //change to fx-user for Fxuser
                    Contractor: {
                        create: {
                            email: EmailAddress,
                            companyName: Company,
                            businessPhone: BusinessPhone,
                            homePhone: HomePhone
                        },
                   },
                    
                //    fxBidder: {
                //        create: {
                //            email: emailAddress,
                //            firstName: firstName,
                //            lastName: lastName,
                //            businessPhone: businessPhone
                //         }
                //     }
                }
           });

            console.log(users)
        }
    } catch (error) {
        console.log(error)
    }

    return new Response("Users and contractors/fxBidders created successfully");
}