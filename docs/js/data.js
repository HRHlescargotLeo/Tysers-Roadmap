/* data.js — content for the Tysers reimagined prototype.
   In the Umbraco build each array is a content tree (Specialties, People,
   Offices, Insights) that editors maintain; pages reference nodes rather
   than copying text. Summaries are migrated from tysers.com where the live
   site has them; anything in [square brackets] is new content to write. */

var TY = window.TY = window.TY || {};

/* Specialties: [id, name, division, practice, industries[], summary, old URL] */
TY.specialties = [
  ['pi','Protection & Indemnity','Wholesale & Specialty','Marine & Aviation',['Shipping'],'Tailored protection and indemnity solutions providing reliable, global support for complex maritime liability risks.','/protection-indemnity-insurance/'],
  ['hull','Hull & War','Wholesale & Specialty','Marine & Aviation',['Shipping'],'Dedicated hull and war insurance delivering protection for vessels, fleets and operators navigating volatile global risk.','/hull-machinery-war-piracy-builders-risk-insurance/'],
  ['cargo','Cargo & Stock Throughput','Wholesale & Specialty','Marine & Aviation',['Shipping','Logistics'],'End-to-end cargo and stock throughput insurance providing flexible, responsive protection for global supply chains.','/cargo-stock-throughput-insurance/'],
  ['cargorej','Cargo Rejection','Wholesale & Specialty','Marine & Aviation',['Logistics','Shipping'],'Cargo rejection insurance delivering financial protection and expert support when goods are refused at destination.','/cargo-rejection-insurance/'],
  ['ports','Marine Liability, Ports & Terminals','Wholesale & Specialty','Marine & Aviation',['Shipping','Logistics'],'Ports and terminals cover safeguarding assets, people and operations across global port environments and logistics hubs.','/ports-terminals-insurance/'],
  ['yacht','Superyacht','Wholesale & Specialty','Marine & Aviation',['Shipping','Private clients'],'Yacht insurance for owners worldwide, covering superyachts, crew and marine risks.','/yacht-insurance/'],
  ['trade','Trade Disruption','Wholesale & Specialty','Marine & Aviation',['Logistics','Shipping'],'[Summary to migrate from the live page]','/trade-disruption-insurance/'],
  ['aviation','Aviation','Wholesale & Specialty','Marine & Aviation',['Aviation'],'Specialist aviation insurance delivering tailored cover, global market access and expert support across the aviation and aerospace sector.','/aviation-insurance/'],
  ['pv','Political Violence & Terrorism','Wholesale & Specialty','Property & Casualty',['Shipping','Energy'],'Political violence cover safeguarding assets, operations and people from instability, unrest and hostile acts worldwide.','/political-violence-insurance/ and /terrorism-and-political-violence-insurance/'],
  ['energy','Energy & Construction','Wholesale & Specialty','Energy & Construction',['Energy','Construction'],'Energy and construction cover for complex global projects.','/energy-and-construction-insurance/'],
  ['upstream','Upstream Energy','Wholesale & Specialty','Energy & Construction',['Energy'],'[Summary to migrate from the live page]','/upstream-insurance/'],
  ['midstream','Midstream & Downstream','Wholesale & Specialty','Energy & Construction',['Energy'],'[Summary to migrate from the live page]','/midstream-downstream-insurance/'],
  ['renewables','Power & Renewables','Wholesale & Specialty','Energy & Construction',['Energy'],'[Summary to migrate from the live page]','/power-and-renewables-insurance/'],
  ['cep','Construction, Engineering & Power','Wholesale & Specialty','Energy & Construction',['Construction','Energy'],'[Summary to migrate from the live page]','/construction-engineering-power-insurance/'],
  ['ah','Accident & Health','Wholesale & Specialty','Accident & Health',['Healthcare'],'Specialist Accident & Health cover safeguarding people worldwide through experience and market reach.','/accident-health-insurance/'],
  ['cyber','Cyber','Wholesale & Specialty','Management Risk',['Financial'],'Cover that helps organisations withstand cyberattacks, data breaches and operational disruption, with access to over 70 carriers and GBP/EUR/US $500m+ of capacity.','/cyber-insurance/ and /cyber-crime-insurance/'],
  ['do','Directors & Officers','Wholesale & Specialty','Management Risk',['Financial'],'Expert guidance and focused directors and officers protection that helps leaders manage governance and operational risk.','/directors-and-officers-insurance/'],
  ['epl','Employment Practices Liability','Wholesale & Specialty','Management Risk',['Financial'],'EPL cover for diverse industries, supporting businesses facing employment disputes.','/employment-practices-liability-insurance/'],
  ['fpr','Financial & Professional Risks','Wholesale & Specialty','Management Risk',['Financial'],'Professional insurance solutions protecting businesses from complex financial, legal and operational exposures.','/financial-professional-risks-insurance/'],
  ['health','Healthcare','Wholesale & Specialty','Management Risk',['Healthcare'],'Insurance designed to protect healthcare professionals and organisations with expert guidance and responsive support.','/healthcare-insurance/'],
  ['help','Hostile Environment Liability Protection','Wholesale & Specialty','Management Risk',['Energy','Media'],'Liability insurance that supports organisations and teams in demanding or volatile environments.','/hostile-environment-liability-protection-insurance/'],
  ['ip','Intellectual Property','Wholesale & Specialty','Management Risk',['Financial','Media'],'Specialist cover safeguarding intellectual property from infringement and financial loss.','/intellectual-property-insurance/'],
  ['ma','Mergers & Acquisitions','Wholesale & Specialty','Management Risk',['Financial'],'Tailored M&A insurance designed to protect against unknown liabilities and streamline negotiations.','/mergers-and-acquisitions/'],
  ['pi-prof','Professional Indemnity','Wholesale & Specialty','Management Risk',['Financial'],'Cover designed to defend your work and maintain client confidence.','/professional-indemnity-insurance/'],
  ['sam','Sexual Abuse & Misconduct Liability','Wholesale & Specialty','Management Risk',['Healthcare','Sport'],'Specialist liability insurance that helps organisations manage and respond to allegations of sexual abuse or misconduct.','/sexual-abuse-misconduct-liability-insurance/'],
  ['da','Delegated Authority','Wholesale & Specialty','Property & Casualty',['Financial'],'[Summary to migrate from the live page]','/delegated-authority-insurance/'],
  ['intcas','International Casualty','Wholesale & Specialty','Property & Casualty',['Construction','Energy'],'[Summary to migrate from the live page]','/international-casualty-insurance/'],
  ['intprop','International Property','Wholesale & Specialty','Property & Casualty',['Construction'],'[Summary to migrate from the live page]','/international-property-insurance/'],
  ['naprop','North American Property','Wholesale & Specialty','Property & Casualty',['Construction'],'[Summary to migrate from the live page]','/property-insurance/'],
  ['nacap','North American Capabilities','Wholesale & Specialty','Property & Casualty',['Construction','Healthcare'],'[Summary to migrate from the live page]','/north-american-insurance-capabilities/'],
  ['usaunz','US, Australia and New Zealand Construction','Wholesale & Specialty','Property & Casualty',['Construction'],'[Summary to migrate from the live page]','/american-australian-and-new-zealand-insurance/'],
  ['latent','Latent Defects','Wholesale & Specialty','Property & Casualty',['Construction'],'[Summary to migrate from the live page]','/latent-defects-insurance/'],
  ['re','Reinsurance','Wholesale & Specialty','Reinsurance',['Financial'],'Treaty, facultative and hybrid reinsurance programmes that help (re)insurers and underwriting managers improve financial performance and manage volatility.','/reinsurance-capabilities/'],
  ['band','Band & Performer','Tysers Live','Music & Live Events',['Music'],'A suite of musician insurance products designed for almost all eventualities.','/band-and-performer-insurance/'],
  ['eventprod','Event Production','Tysers Live','Music & Live Events',['Music'],'For everyone from freelance event professionals to large production companies.','/event-production-insurance/'],
  ['promoter','Event Promoter & Organiser','Tysers Live','Music & Live Events',['Music'],'Cover that reflects how much venues and activities vary from one event to the next.','/event-promoter-organiser-insurance/'],
  ['festival','Festival','Tysers Live','Music & Live Events',['Music'],'Festival insurance covering the risks of hosting an event, from small local festivals to large headline events.','/festival-insurance/'],
  ['freelancepl','Freelancers Public & Products Liability','Tysers Live','Music & Live Events',['Music','Media'],'Public and products liability for freelancers, with quotes available online.','/freelancers-public-liability-insurance/'],
  ['av','Audio Visual & Camera Rental','Tysers Live','Music & Live Events',['Music','Media'],'[Summary to migrate from the live page]','/audio-visual-camera-rental-installation-and-supply-insurance/'],
  ['conf','Event & Conference','Tysers Live','Media, Film & TV',['Media'],'[Summary to migrate from the live page]','/event-and-conference-insurance/'],
  ['production','Production','Tysers Live','Media, Film & TV',['Media'],'[Summary to migrate from the live page]','/production-insurance/'],
  ['freelancer','Freelancer','Tysers Live','Media, Film & TV',['Media'],'[Summary to migrate from the live page]','/freelancer-insurance/'],
  ['ob','Outside Broadcast','Tysers Live','Media, Film & TV',['Media','Sport'],'[Summary to migrate from the live page]','/outside-broadcast-insurance/'],
  ['post','Post-Production & VFX','Tysers Live','Media, Film & TV',['Media'],'[Summary to migrate from the live page]','/post-production-insurance/'],
  ['influencer','Influencer','Tysers Live','Media, Film & TV',['Media'],'[Summary to migrate from the live page]','/influencer-insurance/'],
  ['theatrevenue','Theatre Venue','Tysers Live','Theatre & Venues',['Music'],'[Summary to migrate from the live page]','/theatre-venue-insurance/'],
  ['theatreprod','Theatre Producer','Tysers Live','Theatre & Venues',['Music'],'[Summary to migrate from the live page]','/theatre-producer-insurance/'],
  ['theatretrade','Theatre Trade','Tysers Live','Theatre & Venues',['Music'],'[Summary to migrate from the live page]','/theatre-trade-insurance/'],
  ['cancel','Event Cancellation & Non-Appearance','Tysers Live','Contingency',['Music','Sport'],'[Summary to migrate from the live page]','/event-cancellation-and-non-appearance-insurance/'],
  ['prize','Prize Indemnity & Over-Redemption','Tysers Live','Contingency',['Media'],'[Summary to migrate from the live page]','/prize-indemnity-and-over-redemption-insurance/'],
  ['kr','Kidnap & Ransom','Tysers Live','Contingency',['Media','Energy'],'[Summary to migrate from the live page]','/kidnap-and-ransom-insurance/'],
  ['adagency','Advertising Agency','Tysers Live','Advertising & Commercials',['Media'],'[Summary to migrate from the live page]','/advertising-agency-insurance/'],
  ['commercial','Commercial Film Production','Tysers Live','Advertising & Commercials',['Media'],'[Summary to migrate from the live page]','/commercial-film-production-insurance/'],
  ['sportevent','Sport Event Organiser','Tysers Live','Sport & Motorsport',['Sport'],'[Summary to migrate from the live page]','/general-sport-event-organiser-insurance/'],
  ['governing','Governing Body & Association','Tysers Live','Sport & Motorsport',['Sport'],'[Summary to migrate from the live page]','/governing-body-and-association-insurance/'],
  ['prosport','Professional Sports','Tysers Live','Sport & Motorsport',['Sport'],'[Summary to migrate from the live page]','/professional-sports-insurance/'],
  ['sportmgmt','Sports Management','Tysers Live','Sport & Motorsport',['Sport'],'[Summary to migrate from the live page]','/sports-management-insurance/'],
  ['venue','Venue Owner','Tysers Live','Sport & Motorsport',['Sport','Music'],'[Summary to migrate from the live page]','/venue-owner-insurance/'],
  ['motorsport','Motorsport','Tysers Live','Sport & Motorsport',['Sport'],'[Summary to migrate from the live page]','/motorsport-insurance/'],
  ['esport','Esports (events, leagues, teams and sponsors)','Tysers Live','Esports',['Sport'],'[Summary to migrate from four live pages]','/e-sports-event-insurance/, /e-sport-league-insurance/, /e-sport-team-insurance/, /e-sports-sponsor-insurance/'],
  ['corporate','Corporate & Mid-sized Business','Business & Private Clients','Business',['Financial','Construction'],'Tailored protection for UK-domiciled companies with more than 50 employees and annual revenues above £15m.','/corporate-mid-sized-business-insurance-solutions/'],
  ['small','Small Business','Business & Private Clients','Business',['Financial'],'Tailored protection for UK-domiciled small and micro businesses with up to 50 employees and revenues up to £15m.','/small-business-insurance-solutions/'],
  ['construction','Construction','Business & Private Clients','Business',['Construction'],'Support for construction businesses of every size and discipline.','/construction-insurance/'],
  ['haulage','Haulage & Logistics','Business & Private Clients','Business',['Logistics'],'Cover for businesses transporting goods for hire or reward, from a single vehicle to a fleet.','/haulage-insurance/, /haulage-courier-and-logistics-insurance/ and /logistics-insurance/'],
  ['propowner','Property Owners','Business & Private Clients','Business',['Construction'],'Protection for property portfolios at every level.','/property-owners-insurance/'],
  ['solicitors','Solicitors','Business & Private Clients','Business',['Financial'],'Insurance and risk advice for legal practices, from single-office firms to multi-site practices.','/solicitors-insurance/'],
  ['mobility','Mobility','Business & Private Clients','Business',['Healthcare'],'[Summary to rewrite from the live page]','/mobility-insurance/'],
  ['els','English Language Schools','Business & Private Clients','Business',['Financial'],'Cover that understands how English language schools operate.','/english-language-schools/'],
  ['auto','Automotive','Business & Private Clients','Business',['Sport'],'From the Mille Miglia to the Peking to Paris, motorsport, racetracks, events and automotive businesses.','/automotive-insurance/'],
  ['intbiz','International Business','Business & Private Clients','Business',['Financial'],'Protection for UK-domiciled businesses with overseas operations, through the Tysers global network.','/international-business-insurance/'],
  ['home','High-Value Home','Business & Private Clients','Private clients',['Private clients'],'Cover for individual homes, global portfolios, holiday homes and family estates.','/high-value-home-insurance/ and five related pages'],
  ['holiday','Holiday Home','Business & Private Clients','Private clients',['Private clients'],'Premium holiday let insurance, from characterful listed homes to modern retreats.','/holiday-home-insurance/'],
  ['art','Fine Art & Valuables','Business & Private Clients','Private clients',['Private clients'],'Fine art, rare antiques, jewellery and timepieces.','/fine-art-insurance/ and three related pages'],
  ['car','Prestige Car','Business & Private Clients','Private clients',['Private clients'],'From a single high-performance vehicle to a classic collection.','/prestige-car-insurance/ and eight related pages'],
  ['collections','Speciality Collections','Business & Private Clients','Private clients',['Private clients'],'Rare wines, designer handbags, movie memorabilia and other collectibles.','/collectors-insurance/'],
  ['boat','Pleasure Craft & Yacht','Business & Private Clients','Private clients',['Private clients'],'[Summary to migrate from the live page]','/boat-insurance/'],
  ['familyoffice','Family Office','Business & Private Clients','Private clients',['Private clients','Financial'],'[Summary to migrate from the live page]','/family-office-insurance/'],
  ['travel','Worldwide Travel','Business & Private Clients','Private clients',['Private clients'],'[Summary to migrate from the live page]','/worldwide-travel-insurance/'],
  ['pmi','Private Medical','Business & Private Clients','Private clients',['Private clients','Healthcare'],'[Summary to migrate from the live page]','/private-medical-insurance/']
];

/* People: [id, name, role, division, specialties[], office, email, phone, isLeadership]
   Names and roles are as published on tysers.com. Contact details are shown
   only where tysers.com already publishes them; otherwise a placeholder. */
TY.people = [
  ['tom-wilson','Tom Wilson','Chief Executive Officer','Leadership',[],'London','[email]','[direct line]',true],
  ['andrew-kendrick','Andrew Kendrick','Chair, Tysers Board','Leadership',[],'London','','',true],
  ['mike-emmett','Mike Emmett','Board member; CEO, AUB Group','Leadership',[],'London','','',true],
  ['belinda-schofield','Belinda Schofield','Board member','Leadership',[],'London','','',true],
  ['bob-pybus','Bob Pybus','Executive Team [role]','Leadership',[],'London','[email]','[direct line]',true],
  ['tracey-anderson','Tracey Anderson','Executive Team [role]','Leadership',[],'London','[email]','[direct line]',true],
  ['jason-collins','Jason Collins','Executive Team [role]','Leadership',[],'London','[email]','[direct line]',true],
  ['celia-mather','Celia Mather','Press & Media Enquiries','Leadership',[],'London','celia.mather@tysers.com','+44 (0)7585 329353',true],
  ['simon-smart','Simon Smart','Head of P&I, Marine & Aviation','Wholesale & Specialty',['pi'],'London','[email]','[direct line]',false],
  ['chris-bracegirdle','Chris Bracegirdle','Director, Marine & Aviation','Wholesale & Specialty',[],'London','[email]','[direct line]',false],
  ['giles-penfold','Giles Penfold','Director, Marine & Aviation','Wholesale & Specialty',[],'London','[email]','[direct line]',false],
  ['graham-gordon','Graham Gordon','Marine Divisional Director, Tysers Singapore','Wholesale & Specialty',[],'Singapore','[email]','[direct line]',false],
  ['william-furness-smith','William Furness-Smith','Interim CEO, Tysers Singapore','Wholesale & Specialty',[],'Singapore','[email]','[direct line]',false],
  ['toby-clowes','Toby Clowes','Deputy Managing Director, Management Risk','Wholesale & Specialty',['cyber','do','fpr'],'London','[email]','[direct line]',false],
  ['richard-johnston','Richard Johnston','Chairman, Reinsurance','Wholesale & Specialty',['re'],'London','[email]','[direct line]',false],
  ['mark-robinson','Mark Robinson','Director, Reinsurance','Wholesale & Specialty',['re'],'London','[email]','[direct line]',false],
  ['laurence-upton','Laurence Upton','[Role], Facultative','Wholesale & Specialty',['re'],'London','[email]','[direct line]',false],
  ['william-lines','William Lines','[Role], Property & Casualty','Wholesale & Specialty',['intprop','intcas'],'London','[email]','[direct line]',false],
  ['ben-lott','Ben Lott','[Role], Non-Marine, Tysers Dubai','Wholesale & Specialty',['intprop'],'Dubai','[email]','[direct line]',false],
  ['chris-sydenham','Chris Sydenham','Chairman, Wholesale, Marine & Aviation Claims','Claims',['pi','hull','cargo','aviation'],'London','chris.sydenham@tysers.com','+44 (0)7971 501772',false],
  ['karl-haynes','Karl Haynes','Managing Director, Wholesale Claims','Claims',['re','intprop'],'London','karl.haynes@tysers.com','+44 (0)7507 492117',false],
  ['mark-anderson','Mark Anderson','Director, Non-Marine Claims','Claims',['cyber','do','intprop','intcas'],'London','mark.anderson@tysers.com','+44 (0)7881 265061 [to confirm]',false],
  ['shaun-warbey','Shaun Warbey','Director, Non-Marine Claims & Claims Operations','Claims',['intprop','intcas','re'],'London','shaun.warbey@tysers.com','[direct line to confirm]',false],
  ['marlena-truszczynska','Marlena Truszczynska','Head of Shipping Claims','Claims',['pi','hull'],'London','[email]','[direct line]',false],
  ['prantika-sengupta','Prantika Sengupta','Director of Marine Claims & Client Relations, Tysers Singapore','Claims',['pi','hull','cargo'],'Singapore','[email]','[direct line]',false],
  ['sarah-hingston','Sarah Hingston','Manager, Claims, Colchester','Claims',['festival','production','band'],'Colchester','sarah.hingston@tysers.com','01206 756033',false],
  ['will-sanderson','Will Sanderson','Manager, Claims, Manchester','Claims',['sportevent','prosport'],'Manchester','will.sanderson@tysers.com','0161 419 3021',false],
  ['karen-brown','Karen Brown','Associate Director, Claims, London','Claims',['cancel','production'],'London','karen.brown@tysers.com','0203 915 0137',false],
  ['live-lead','[Name]','[Head of Music & Live Events]','Tysers Live',['festival','band','eventprod','promoter'],'Colchester','[email]','[direct line]',false],
  ['live-media','[Name]','[Head of Media, Film & TV]','Tysers Live',['production','post','ob'],'London','[email]','[direct line]',false],
  ['bpc-lead','[Name]','[Head of Private Clients]','Business & Private Clients',['home','art','car'],'Hitchin','[email]','[direct line]',false]
];

/* Offices: [id, name, region, address, phone, email, note, regulator] */
TY.offices = [
  ['london','Tysers London (headquarters)','UK','70 Fenchurch Street, London, EC3M 4BR','+44 (0)20 3037 8000','quotes@tysers.com','Wholesale & Specialty, Reinsurance, Tysers Live, Claims','Financial Conduct Authority'],
  ['birmingham','Tysers Birmingham','UK','The Colmore Building, 20 Colmore Circus Queensway, Birmingham, B4 6AT','+44 (0)1462 477872 [to confirm]','birmingham@tysers.com','Business & Private Clients','Financial Conduct Authority'],
  ['colchester','Tysers Colchester','UK','7 Blue Barns Business Park, Old Ipswich Road, Ardleigh, Colchester, CO7 7FX','+44 (0)1206 500 000','colchester@tysers.com','Tysers Live, Business & Private Clients','Financial Conduct Authority'],
  ['hitchin','Tysers Hitchin','UK','3-4 Park Street, Hitchin, Hertfordshire, SG4 9AH','+44 (0)333 011 2288','hitchin@tysers.com','Business & Private Clients','Financial Conduct Authority'],
  ['manchester','Tysers Manchester','UK','2nd Floor, 11 York Street, Manchester, M2 2AW','+44 (0)161 419 3000','manchester@tysers.com','Tysers Live, Business & Private Clients','Financial Conduct Authority'],
  ['belgium','Tysers Belgium','Europe','De Kleetlaan 5BC, 1831 Machelen, Belgium','+32 2 720 53 03','[email]','Gateway to the EU, established after Brexit','Financial Services and Markets Authority (115846A)'],
  ['ireland','Tysers Ireland','Europe','[Address]','[Phone]','[email]','Specialist underwriting agency serving the Irish broker market','[Regulator]'],
  ['dubai','Tysers Dubai','Middle East','Gate Village 8, Fifth Floor Office 1, PO Box 506670, DIFC, Dubai, UAE','[Phone]','info@tysers.com','Opened in the DIFC in 2006','Dubai Financial Services Authority (F000162)'],
  ['saudi','Tysers Saudi Arabia','Middle East','29th Floor, Hamad Tower, King Fahd Road, Olaya District, Riyadh 12212','+966 11 218 1333','[email]','Tysers for Reinsurance Brokerage LLC','Saudi Central Bank (SAMA)'],
  ['bangladesh','Tyser Risk Management (Bangladesh) Limited','Asia','Catharsis Tower, Level 4, House 133, Road 12, Block E, Banani, Dhaka 1213','+88 02 222 274 484','info@trmbl.com','TRMBL','[Regulator]'],
  ['dhaka','Dhaka Liaison Office','Asia','Catharsis Tower, Level 4, House 133, Road 12, Block E, Banani, Dhaka 1213','+88 02 222 274 483','[email]','Local point of contact for clients, insurers and government bodies','[Regulator]'],
  ['singapore','Tysers Singapore','Asia','48 Amoy Street, Singapore 068974','+65 6631 2782','[email]','General reinsurance broker','Monetary Authority of Singapore'],
  ['hongkong','Hawkes Bay Underwriting (Hong Kong)','Asia','[Address]','[Phone]','[email]','Tysers MGA: Financial Lines, Casualty, Marine and Engineering','[Regulator]'],
  ['japan','Tysers Japan (liaison)','Asia','Tokyo [address]','+81 (0)3 6459 0819','[email]','Represented by Japan Consultants Limited; reinsurance from Japan since 1981','[Regulator]'],
  ['australia','Tysers Australia','Australasia','[Address]','[Phone]','[email]','Corporate Authorised Representative of Insurance Advisernet Australia','AR No. 266613, AFSL No. 240549'],
  ['nz','Tysers New Zealand','Australasia','[Address]','[Phone]','[email]','Tysers NZ Ltd, a representative of Insurance Advisernet NZ','FSP No. 705831']
];

/* Insights: [id, title, date (ISO or ''), type, division, summary, author id] */
TY.insights = [
  ['pi-2026','Tysers P&I Report 2026: Who is Pitch Perfect?','2026-09-22','Report','Wholesale & Specialty','Our annual analysis of the International Group of P&I Clubs: performance, financial strength, claims activity and underwriting trends.','simon-smart'],
  ['dubai-nonmarine','Tysers Dubai builds out Non-Marine team with key hire','2026-08-27','People news','Wholesale & Specialty','Ben Lott joins the Non-Marine team in Dubai.',''],
  ['sengupta','Prantika Sengupta appointed Director of Marine Claims & Client Relations, Tysers Singapore','2026-08-13','People news','Wholesale & Specialty','A new marine claims lead for Asia.',''],
  ['mgmt-q4','[Management Risk market update, Q4 2026]','','Market update','Wholesale & Specialty','[New content: a quarterly view of D&O, cyber and PI pricing and capacity]','toby-clowes'],
  ['live-q4','[Festival season review 2026]','','Market update','Tysers Live','[New content: what the 2026 season meant for event cancellation and weather claims]','live-lead'],
  ['truszczynska','Tysers welcomes Marlena Truszczynska as Head of Shipping Claims','2026-01-29','People news','Wholesale & Specialty','A new head of shipping claims in London.',''],
  ['lines','Tysers builds out Property & Casualty team with key hire','2026-01-13','People news','Wholesale & Specialty','William Lines joins Property & Casualty.',''],
  ['pi-dec-2025','Tysers P&I Report: December 2025 update','2025-12-22','Report','Wholesale & Specialty','A comparative summary of the Clubs ahead of the February renewal.','simon-smart'],
  ['mena','Tysers Dubai builds momentum in MENA with strategic hire','2025-12-11','People news','Wholesale & Specialty','Younes Younes joins Tysers Dubai.',''],
  ['drivers-union','Tysers joins forces with The Drivers Union','2025-11-18','People news','Business & Private Clients','A collaboration for car enthusiasts from the High-Net-Worth Private Client team.',''],
  ['agreed-value','Agreed value vs market value: what is the difference?','2025-11-18','Guide','Business & Private Clients','How valuation works when insuring a high-value vehicle.',''],
  ['comparison','Insurance brokers vs comparison sites: what is the difference?','2025-11-06','Guide','Business & Private Clients','What a broker does that a comparison site does not.',''],
  ['underinsurance','Underinsurance: the hidden risk for high-value car owners','2025-11-04','Guide','Business & Private Clients','Why prestige vehicles are often insured for less than they are worth.',''],
  ['pi-2025','Tysers P&I Report 2025','2025-09-18','Report','Wholesale & Specialty','Pool claims at their highest ever level at the one-year point; International Group free reserves approaching $6 billion.','simon-smart'],
  ['cyber-fraud','Cyber fraud incident: how Tysers helped secure an £80,000 recovery','2025-06-10','Claims story','Wholesale & Specialty','An insurer first rejected the claim under the fraudulent instruction section. This is how it was recovered.','mark-anderson'],
  ['pi-2024','Tysers P&I Report 2024: It’s a jungle out there','2024-09-01','Report','Wholesale & Specialty','The 2024 edition of the annual P&I market report.','simon-smart']
];

/* Claims routing: division -> classes -> team */
TY.claims = {
  'Wholesale & Specialty': {
    'Marine, shipping and cargo': {team:'Wholesale Marine & Aviation Claims', lead:'chris-sydenham', alt:'marlena-truszczynska'},
    'Aviation': {team:'Wholesale Marine & Aviation Claims', lead:'chris-sydenham'},
    'Property, casualty and energy': {team:'Wholesale Non-Marine Claims', lead:'mark-anderson', alt:'shaun-warbey'},
    'Management risk, cyber and D&O': {team:'Wholesale Non-Marine Claims', lead:'mark-anderson'},
    'Reinsurance': {team:'Wholesale Claims', lead:'karl-haynes'}
  },
  'Tysers Live': {
    'Music, live events and festivals': {team:'Entertainment & Sport Claims, Colchester', lead:'sarah-hingston'},
    'Sport': {team:'Entertainment & Sport Claims, Manchester', lead:'will-sanderson'},
    'Film, TV and productions': {team:'Entertainment & Sport Claims, London', lead:'karen-brown'},
    'Contingency, cancellation and non-appearance': {team:'Contingency Claims', lead:'karen-brown', phone:'0203 915 0126', email:'contclaims@tysers.com'}
  },
  'Business & Private Clients': {
    'Business insurance': {team:'Claims, London', phone:'[number to confirm: the live site shows 0120 675 6033, which dials Colchester]', email:'lonclaims@tysers.com'},
    'Home, motor and private clients': {team:'Claims, Hitchin and Birmingham', phone:'0333 011 2288', email:'hitchinclaimsteam@tysers.com'},
    'Manchester clients': {team:'Claims, Manchester', phone:'0161 419 3000', email:'manchesterclaims@tysers.com'}
  }
};

/* P&I Club comparison: SAMPLE FIGURES ONLY, not from the Tysers report.
   [club, combined ratio %, free reserves $m, GT entered m, general increase %] */
TY.clubs = [
  ['American Club', 104, 180, 25, 7.5],
  ['Britannia', 96, 560, 190, 5],
  ['Gard', 92, 1350, 300, 5],
  ['Japan P&I', 101, 420, 95, 6],
  ['London P&I', 103, 140, 45, 7.5],
  ['NorthStandard', 98, 1200, 270, 5],
  ['Shipowners’ Club', 95, 330, 30, 5],
  ['Skuld', 97, 520, 120, 6],
  ['Steamship Mutual', 99, 480, 80, 6],
  ['The Swedish Club', 100, 160, 55, 6.5],
  ['UK P&I', 97, 620, 160, 5],
  ['West of England', 102, 210, 65, 7]
];

/* Prototype tour order for the pager */
TY.tour = [
  ['index.html','Overview'],['pages/home.html','Home'],['pages/wholesale.html','Wholesale & Specialty'],['pages/industry.html','Industry hub: shipping'],
  ['pages/specialties.html','Specialties A to Z'],['pages/specialty.html?id=pi','Specialty page: P&I'],['pages/people.html','People'],['pages/person.html?id=simon-smart','Person profile'],
  ['pages/claims.html','Claims'],['pages/claim-notify.html','Notify a claim'],['pages/insights.html','Insights'],['pages/pi-report.html','P&I Report 2026'],
  ['pages/article.html?id=cyber-fraud','Article'],['pages/contact.html','Get in touch'],['pages/offices.html','Offices'],['pages/brokers.html','For brokers'],
  ['pages/live.html','Tysers Live'],['pages/business-private.html','Business & Private Clients'],['pages/about.html','About'],['pages/regulatory.html','Regulatory status'],
  ['pages/portal.html','Tysers Portal'],['pages/search.html','Search'],['pages/404.html','Page not found'],['modules/library.html','Module library']
];
