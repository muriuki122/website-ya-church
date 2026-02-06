document.addEventListener('DOMContentLoaded', () => {
    // --- 1. STATE AND CONSTANTS ---
    const ITEMS_PER_PAGE = 9;
    let allDocuments = [];
    let mainFilteredDocuments = [];
    let lessonFilteredDocuments = [];
    let currentPage = 1;
    let currentLanguage = 'en';
    let currentPreviewIndex = 0;
    let currentQuarter = '1';

    // --- 2. TRANSLATIONS WITH NAVIGATION SUPPORT ---
    const translations = {
        en: {
            siteTitle: "PDF Archive",
            heroTitle: "Explore Our Document Collection",
            heroSubtitle: "Browse, preview, and download from our extensive library.",
            searchPlaceholder: "Search documents by title or category...",
            categoriesTitle: "Categories",
            documentsTitle: "Documents",
            footerText: "© 2025 PDF Archive. All rights reserved.",
            downloadBtn: "Download",
            previewBtn: "Preview",
            allCategories: "All Categories",
            docCount: "documents",
            noDocuments: "No Documents Found",
            noDocumentsHelp: "Try adjusting your search or filter criteria.",
            prevBtn: "Previous",
            nextBtn: "Next",
            page: "Page",
            // Navigation translations
            navHome: "Home",
            navWatchOnline: "Watch Online",
            navAboutUs: "About Us",
            navArchives: "Archives",
            navContact: "Contact"
        },
        sw: {
            siteTitle: "Kumbukumbu ya PDF",
            heroTitle: "Gundua Mkusanyiko Wetu wa Nyaraka",
            heroSubtitle: "Vinjari, hakiki, na pakua kutoka kwa maktaba yetu pana.",
            searchPlaceholder: "Tafuta nyaraka kwa jina au kategoria...",
            categoriesTitle: "Kategoria",
            documentsTitle: "Nyaraka",
            footerText: "© 2025 Kumbukumbu ya PDF. Haki zote zimehifadhiwa.",
            downloadBtn: "Pakua",
            previewBtn: "Hakiki",
            allCategories: "Kategoria Zote",
            docCount: "nyaraka",
            noDocuments: "Hakuna Nyaraka Zilizopatikana",
            noDocumentsHelp: "Jaribu kurekebisha utafutaji au kichujio chako.",
            prevBtn: "Iliyotangulia",
            nextBtn: "Inayofuata",
            page: "Ukurasa",
            // Navigation translations
            navHome: "Nyumbani",
            navWatchOnline: "Tazama Mtandaoni",
            navAboutUs: "Kuhusu Sisi",
            navArchives: "Kumbukumbu",
            navContact: "Wasiliana"
        },
        rw: {
            siteTitle: "Ububiko bwa PDF",
            heroTitle: "Shakisha Itsinda ry'Inyandiko Zacu",
            heroSubtitle: "Rondora, urebe mbere, kandi ukuremo amakuru mu bubiko bwacu bwagutse.",
            searchPlaceholder: "Shakisha inyandiko ku mutwe cyangwa icyiciro...",
            categoriesTitle: "Ibyiciro",
            documentsTitle: "Inyandiko",
            footerText: "© 2025 Ububiko bwa PDF. Amahoro yose arinda.",
            downloadBtn: "Kuramo",
            previewBtn: "Reba mbere",
            allCategories: "Ibyiciro Byose",
            docCount: "inyandiko",
            noDocuments: "Nta Nyandiko Zabonetse",
            noDocumentsHelp: "Gerageza guhindura ushakisha cyangwa ibisanzwe.",
            prevBtn: "Ibanjirije",
            nextBtn: "Ikurikira",
            page: "Urupapuro",
            // Navigation translations
            navHome: "Ahabanza",
            navWatchOnline: "Reba kuri interineti",
            navAboutUs: "Twebwe",
            navArchives: "Ububiko",
            navContact: "Twandikire"
        }
    };

    // --- 3. YOUR REAL DOCUMENT DATA ---
    function getDocumentData() {
        return [
            // Example documents - REPLACE WITH YOUR ACTUAL 100+ DOCUMENTS
            { id: 1, title: "Judah Report 2023", category: "Judah Reports", fileName: "78-Tibet.pdf" },
            { id: 2, title: "Judah Report 2023", category: "Judah Reports", fileName: "72-Sebat.pdf" },
            { id: 3, title: "Judah Report 2023", category: "Judah Reports", fileName: "Judah-82-NovDec (2).pdf" },
            { id: 4, title: "Judah Report 2023", category: "Judah Reports", fileName: "Judah-82-NovDec.pdf" },
            { id: 5, title: "Judah Report 2023", category: "Judah Reports", fileName: "Judah-86Aug.pdf" },
            { id: 6, title: "Judah Report 2023", category: "Judah Reports", fileName: "Judah-90 (1).pdf" },
            { id: 7, title: "Judah Report 2023", category: "Judah Reports", fileName: "Judah-90.pdf" },
            { id: 8, title: "Judah Report 2023", category: "Judah Reports", fileName: "Judah-91 (1).pdf" },
            { id: 9, title: "Judah Report 2023", category: "Judah Reports", fileName: "Judah-91.pdf" },
            { id: 10, title: "Judah Report 2023", category: "Judah Reports", fileName: "Judah-95MarApr.pdf" },
            { id: 11, title: "Judah Report 2023", category: "Judah Reports", fileName: "Judah-Failure-to-stand-by-Her-Agreed-Test-of-Over-1900-Years-Ago-But-many-are-now.pdf" },
            { id: 2, title: "Sep Report 2023", category: "Sep Reports", fileName: "Sep-1970.pdf" },

            { id: 12, title: "M.T. Zion Analysis", category: "m.t zion report", fileName: "Mt-Zion-Reporter_AN-Dugger.pdf" },

            { id: 13, title: "Scanned Document 001", category: "scanned pdf", fileName: "scan0068.pdf", },
            { id: 14, title: "Scanned Document 001", category: "scanned pdf", fileName: "scan0069.pdf", },
            { id: 16, title: "Scanned Document 001", category: "scanned pdf", fileName: "scan0070.pdf", },
            { id: 17, title: "Scanned Document 001", category: "scanned pdf", fileName: "scan0071.pdf" },
            { id: 19, title: "Scanned Document 001", category: "scanned pdf", fileName: "scan0072.pdf" },
            { id: 21, title: "Scanned Document 001", category: "scanned pdf", fileName: "scan0073.pdf" },
            { id: 22, title: "Scanned Document 001", category: "scanned pdf", fileName: "scan0074.pdf", },
            { id: 23, title: "Scanned Document 001", category: "scanned pdf", fileName: "scan0075.pdf" },
            { id: 24, title: "Scanned Document 001", category: "scanned pdf", fileName: "scan0076.pdf", },
            { id: 25, title: "Scanned Document 001", category: "scanned pdf", fileName: "scan0077.pdf" },
            { id: 26, title: "Scanned Document 001", category: "scanned pdf", fileName: "scan0078.pdf", },

            { id: 27, title: "Sivan Monthly Report", category: "sivan", fileName: "90-Sivan.pdf", },
            { id: 28, title: "Sivan Monthly Report", category: "sivan", fileName: "88-Sivan.pdf", },
            { id: 29, title: "Sivan Monthly Report", category: "sivan", fileName: "81-Sivan.pdf", },
            { id: 30, title: "Sivan Monthly Report", category: "sivan", fileName: "79-Sivan.pdf", },
            { id: 31, title: "Sivan Monthly Report", category: "sivan", fileName: "78-Sivan.pdf", },
            { id: 32, title: "Sivan Monthly Report", category: "sivan", fileName: "77-Zif-Sivan.pdf", },
            { id: 27, title: "Sivan Monthly Report", category: "sivan", fileName: "77-Zif-Sivan(1).pdf", },
            { id: 28, title: "Sebat Monthly Report", category: "sebat", fileName: "72-Sebat.pdf", },

            { id: 13, title: "History of the true church", category: "BOOK pdf", fileName: "A-History-of-true-Church-Dugger-and-Dodd.pdf", },
            { id: 14, title: "Babylon mystery religion", category: "BOOK pdf", fileName: "Babylon-Mystery-Religion-by-Ralph-Woodrow-1981.pdf", },
            { id: 16, title: "Beginning and ending of God's day", category: "BOOK pdf", fileName: "Beginning-and-Ending-of-Gods-Day.pdf", },
            { id: 17, title: "Biblical Doctrine", category: "BOOK pdf", fileName: "Biblical-Doctrine-of-Predestination.pdf" },
            { id: 19, title: "Coming Home", category: "BOOK pdf", fileName: "Coming-Home.pdf" },
            { id: 21, title: "Complete jewishbible", category: "Jewish BIble", fileName: "Complete-jewish-Bible.pdf" },
            { id: 22, title: "Dates of crises in the bible", category: "BOOK pdf", fileName: "Crises-Dates-in-Bible-Prophecy.pdf", },
            { id: 23, title: "Daniel", category: "BOOK pdf", fileName: "Daniel.pdf" },
            { id: 24, title: "Death in the Kitchen", category: "BOOK pdf", fileName: "Death-in-the-Kitchen.pdf", },
            { id: 25, title: "Plagues", category: "BOOK pdf", fileName: "Deliverance-from-plagues-is-knowing-his-number.pdf" },
            { id: 26, title: "The Primitive Church", category: "BOOK pdf", fileName: "Doctrine-and-history-of-the-primitive-church.pdf", },
            { id: 13, title: "True Religion", category: "BOOK pdf", fileName: "Doctrine-and-History-of-the-True-religion.pdf", },
            { id: 14, title: "Is there any difference", category: "BOOK pdf", fileName: "Does-it-make-difference.pdf", },
            { id: 16, title: "Does the Bibble contradict", category: "BOOK pdf", fileName: "Does-the-Bible-Contradict-Itself.pdf", },
            { id: 17, title: "Dugger potter debate", category: "BOOK pdf", fileName: "Dugger-Porter-Debate.pdf" },
            { id: 19, title: "Easther,chritmas were Pagan", category: "BOOK pdf", fileName: "Easter-Christmas-And-Sunday-Were-Pagan.pdf" },
            { id: 21, title: "BOOK Document 001explanations of common texts", category: "BOOK pdf", fileName: "Explanation-of-common-texts-used-against-the-Bible-Sabbath.pdf" },
            { id: 22, title: "40 reason why Sabbath should be kept", category: "BOOK pdf", fileName: "Forty-Reasons-Why-The-7th-Day-Sabbath-Should-Be-Kept.pdf", },
            { id: 23, title: "Forty points of doctrine", category: "BOOK pdf", fileName: "FortyPointsofDoctrine.pdf" },
            { id: 24, title: "FOXs-BOOK-of-MARTYRS", category: "BOOK pdf", fileName: "FOXs-BOOK-of-MARTYRS.pdf", },
            { id: 25, title: "has-our-messiah-come-better", category: "BOOK pdf", fileName: "has-our-messiah-come-better.pdf" },
            { id: 26, title: "Hell-What-and-Where-is-it", category: "BOOK pdf", fileName: "Hell-What-and-Where-is-it.pdf", },
            { id: 14, title: "How-old-is-your-Church.pdf", category: "BOOK pdf", fileName: "How-old-is-your-Church.pdf", },
            { id: 16, title: "I-will-Bless-Them-That-Bless-Thee", category: "BOOK pdf", fileName: "I-will-Bless-Them-That-Bless-Thee.pdf", },
            { id: 17, title: "ISRAEL-BIBLE-CALENDER-2025-2026", category: "BOOK pdf", fileName: "ISRAEL-BIBLE-CALENDER-2025-2026.pdf" },
            { id: 19, title: "Israel-Bible-Correspondence", category: "BOOK pdf", fileName: "Israel-Bible-Correspondence.pdf" },
            { id: 21, title: "BIsrael3", category: "BOOK pdf", fileName: "Israel3.pdf" },
            { id: 22, title: "BOOK Document 001", category: "BOOK pdf", fileName: "Israel-God-a-Reality-or-a-Myth.pdf", },
            { id: 23, title: "BOOK Document 001", category: "BOOK pdf", fileName: "Judah-Failure-to-Stand-by-Her-Agreed-Test-Over-1900-Years-Ago-But-many-are-now.pdf" },
            { id: 24, title: "BOOK Document 001", category: "BOOK pdf", fileName: "Mt-Zion-Reporter-AN-Dugger.pdf", },
            { id: 25, title: "BOOK Document 001", category: "BOOK pdf", fileName: "Mt-Sinai-Speaks-Once-More.pdf" },
            { id: 26, title: "BOOK Document 001", category: "BOOK pdf", fileName: "MZR1956Sept.pdf.pdf", },
            { id: 14, title: "BOOK Document 001", category: "BOOK pdf", fileName: "MZR2008-Q2.pdf", },
            { id: 16, title: "BOOK Document 001", category: "BOOK pdf", fileName: "One-door-for-the-Gentiles-to-enter.pdf", },
            { id: 17, title: "BOOK Document 001", category: "BOOK pdf", fileName: "Passover-and-lords-Supper.pdf" },
            { id: 19, title: "BOOK Document 001", category: "BOOK pdf", fileName: "Punishment-of-the-wicked.pdf" },
            { id: 21, title: "BOOK Document 001", category: "BOOK pdf", fileName: "REASONS-WHY-SEVEN-LAST-PLAQUES-ARE-IN-THE-FUTURE.pdf" },
            { id: 22, title: "BOOK Document 001", category: "BOOK pdf", fileName: "THE-BIBLE-HOME-INSTRUCTOR.pdf", },
            { id: 23, title: "BOOK Document 001", category: "BOOK pdf", fileName: "The-Bible-name-for-the-church.pdf" },
            { id: 24, title: "BOOK Document 001", category: "BOOK pdf", fileName: "The-Daughter-of-Jerusalem-and-the-daughter-of-babylon(1).pdf", },
            { id: 25, title: "BOOK Document 001", category: "BOOK pdf", fileName: "The-Daughter-of-Jerusalem-and-the-daughter-of-babylon.pdf" },
            { id: 26, title: "BOOK Document 001", category: "BOOK pdf", fileName: "The-end-of-the-world.pdf", },

            { id: 24, title: "BOOK Document 001", category: "BOOK pdf", fileName: "The-eternal-abode-of-the-righteous(1).pdf", },
            { id: 25, title: "BOOK Document 001", category: "BOOK pdf", fileName: "The-eternal-abode-of-the-righteous.pdf" },
            { id: 26, title: "BOOK Document 001", category: "BOOK pdf", fileName: "The-Greatest-Discovery-of-the-Age-Noahs-Ark-Found.pdf", },
            { id: 14, title: "BOOK Document 001", category: "BOOK pdf", fileName: "The-Greatest-Miracle-of-the-Age-The-Re-birth-of-israel.pdf", },
            { id: 16, title: "BOOK Document 001", category: "BOOK pdf", fileName: "The-Holy-Spirit.pdf", },
            { id: 17, title: "BOOK Document 001", category: "BOOK pdf", fileName: "The-Law-of-God-versus-Devils-scrapbook.pdf" },
            { id: 19, title: "BOOK Document 001", category: "BOOK pdf", fileName: "The-Law-of-the-Spirit-of-Life.pdf" },
            { id: 21, title: "BOOK Document 001", category: "BOOK pdf", fileName: "The-Living-Truth.pdf" },
            { id: 22, title: "BOOK Document 001", category: "BOOK pdf", fileName: "The-mirror-of-God.pdf", },
            { id: 23, title: "BOOK Document 001", category: "BOOK pdf", fileName: "The-Restoration-of-the-Kingdom-to-Israel.pdf" },
            { id: 24, title: "BOOK Document 001", category: "BOOK pdf", fileName: "THE-RESURRECTION-OF-CHRIST.pdf", },
            { id: 25, title: "BOOK Document 001", category: "BOOK pdf", fileName: "The-Ten-Tribes-of-Israel-Not-Lost-hut-found.pdf" },
            { id: 26, title: "BOOK Document 001", category: "BOOK pdf", fileName: "The-Two-Babylons.pdf", },
            { id: 14, title: "BOOK Document 001", category: "BOOK pdf", fileName: "Was-Man-Created.pdf", },
            { id: 16, title: "BOOK Document 001", category: "BOOK pdf", fileName: "What-Is-the-Real-Baptism-Doctrine.pdf", },
            { id: 17, title: "BOOK Document 001", category: "BOOK pdf", fileName: "What-Was-Abolished-By-Christ.pdf" },
            { id: 19, title: "BOOK Document 001", category: "BOOK pdf", fileName: "Which-Day-is-The-Sabbath.pdf" },
            { id: 21, title: "BOOK Document 001", category: "BOOK pdf", fileName: "Who-Are-The-Messianic-Jews-in-Israel.pdf" },
            { id: 22, title: "BOOK Document 001", category: "BOOK pdf", fileName: "WHY-I-AM-NOT-A-SEVENTH-DAY-ADVENTIST.pdf", },
            { id: 23, title: "BOOK Document 001", category: "BOOK pdf", fileName: "why-israel-is-here-to-stay-potrait.pdf" },
            { id: 24, title: "BOOK Document 001", category: "BOOK pdf", fileName: "why-not-talk-to-God-about-Sabbath.pdf", },


            { id: 1, title: "elul Report 2023", category: "Date Reports", fileName: "72-Elul.pdf" },
            { id: 2, title: "july Report 2023", category: "Date Reports", fileName: "72-July.pdf" },
            { id: 3, title: "August(1) Report 2023", category: "Date Reports", fileName: "73-July.pdf" },
            { id: 5, title: "July 81 Report 2023", category: "Date Reports", fileName: "77-August.pdf" },
            { id: 6, title: "July 83 Report 2023", category: "Date Reports", fileName: "81-August.pdf" },
            { id: 7, title: "July 85 Report 2023", category: "Date Reports", fileName: "81-July.pdf" },
            { id: 8, title: "August 89 Report 2023", category: "Date Reports", fileName: "83-July.pdf" },
            { id: 9, title: "May 91 Report 2023", category: "Date Reports", fileName: "85-July.pdf" },
            { id: 10, title: "Sept 91 Report 2023", category: "Date Reports", fileName: "89-August.pdf" },
            { id: 11, title: "May 93 Report 2023", category: "Date Reports", fileName: "91-May.pdf" },

            { id: 12, title: "Dec 94 Report 2023", category: "Date Reports", fileName: "91-sept.pdf" },

            { id: 13, title: "96 August Document 001", category: "Date Reports", fileName: "93-May.pdf", },
            { id: 14, title: "96 NovDocument 001", category: "Date Reports", fileName: "94-Dec.pdf", },
            { id: 16, title: "97 March Document 001", category: "Date Reports", fileName: "96-Aug.pdf", },
            { id: 17, title: "July 98 Document 001", category: "Date Reports", fileName: "96-Nov.pdf" },
            { id: 19, title: "98 nov Document 001", category: "Date Reports", fileName: "97-March.pdf" },
            { id: 21, title: "1844 Document 001", category: "Date Reports", fileName: "98-July.pdf" },

            { id: 8, title: "Feb 1970 Report 2023", category: "Date Reports", fileName: "98-Nov.pdf" },
            { id: 9, title: "Jan 1971 Report 2023", category: "Date Reports", fileName: "1844.pdf" },
            { id: 10, title: "Jan 1974 Report 2023", category: "Date Reports", fileName: "Jan-1971.pdf" },
            { id: 11, title: "Jan-Feb 1974 Report 2023", category: "Date Reports", fileName: "Jan-1974.pdf" },

            { id: 12, title: "Jan-Feb-1977 Report 2023", category: "Date Reports", fileName: "Jan-Feb-1977.pdf" },

            { id: 13, title: "July-1970 Document 001", category: "Date Reports", fileName: "Jul1970.pdf", },
            { id: 14, title: "July 1987 (1)", category: "Date Reports", fileName: "July-1987(1).pdf", },
            { id: 16, title: " July 1987", category: "Date Reports", fileName: "July-1987.pdf", },
            { id: 17, title: "June-1972", category: "Date Reports", fileName: "June-1972.pdf" },
            { id: 19, title: "March-1974", category: "Date Reports", fileName: "March-1974.pdf" },
            { id: 21, title: "May-1972", category: "Date Reports", fileName: "May-1972.pdf" },


            { id: 24, title: "Elul", category: "Elul pdf", fileName: "72-Elul.pdf", },
            { id: 25, title: "Sebat", category: "Sebat pdf", fileName: "72-Sebat.pdf" },
            { id: 26, title: "Bul", category: "Bul pdf", fileName: "73-Bul.pdf", },
            { id: 14, title: "Chisleu", category: "Chisleu pdf", fileName: "73-Chisleu.pdf", },
            { id: 16, title: "Zif", category: "Zif pdf", fileName: "73-Zif(1).pdf", },
            { id: 17, title: "Zif sivan", category: "Zif sivan pdf", fileName: "77-Zif-Sivan.pdf" },
            { id: 19, title: "Zif sivan 1", category: "Zif sivan 1 pdf", fileName: "Zif sivan(1).pdf" },
            { id: 21, title: "Elul", category: "Elul pdf", fileName: "78-Elul.pdf" },
            { id: 22, title: "Tibet", category: "Tibet pdf", fileName: "78-Tibet.pdf", },
            { id: 23, title: "Bul", category: "Bul pdf", fileName: "79-Bul.pdf" },
            { id: 24, title: "Ethanim", category: "Ethanim pdf", fileName: "79-Ethanim.pdf", },
            { id: 25, title: "Sivan", category: "Sivan pdf", fileName: "79-Sivan.pdf" },
            { id: 26, title: "Zif", category: "Zif pdf", fileName: "79-Zif", },

            { id: 24, title: "Elul", category: "Elul pdf", fileName: "80-Elul.pdf", },
            { id: 25, title: "Tebet", category: "Tebet pdf", fileName: "80-Tebet.pdf" },
            { id: 26, title: "Bul", category: "Bul pdf", fileName: "81-Bul.pdf", },
            { id: 14, title: "Chesleu", category: "Chesleu pdf", fileName: "81-Chesleu.pdf", },
            { id: 16, title: "Elul", category: "Elul pdf", fileName: "81-Elul.pdf", },
            { id: 17, title: "Sivan", category: "Sivan pdf", fileName: "81-Sivan.pdf" },

            { id: 24, title: "Bull-chisleu", category: "Bul-chisleu pdf", fileName: "82-Bul-Chisleu.pdf", },
            { id: 25, title: "Elul", category: "Elul pdf", fileName: "82-Elul.pdf" },
            { id: 26, title: "Ethanim", category: "Ethanim pdf", fileName: "82-Ethanim.pdf", },
            { id: 14, title: "Nisan", category: "Nisan pdf", fileName: "82-Nisan.pdf", },
            { id: 16, title: "Elul", category: "Elul pdf", fileName: "83-Elul.pdf", },
            { id: 17, title: "Chisleu sivan", category: "Chisleu pdf", fileName: "84-Chisleu.pdf" },
            { id: 19, title: "Chesleu", category: "Chesleu pdf", fileName: "85-Chesleu.pdf" },
            { id: 21, title: "Zif", category: "Zif pdf", fileName: "87-Zif.pdf" },
            { id: 22, title: "Bul", category: "Bul pdf", fileName: "88-Bul.pdf", },
            { id: 23, title: "Sivan", category: "Sivan pdf", fileName: "88-Sivan.pdf" },
            { id: 24, title: "Bul", category: "Bul pdf", fileName: "89-Bul.pdf", },
            { id: 25, title: "Sivan", category: "Sivan pdf", fileName: "90-Alul.pdf" },
            { id: 26, title: "Sivan", category: "Sivan pdf", fileName: "90-Sivan.pdf", },


            { id: 21, title: "July", category: "July pdf", fileName: "July-1970.pdf" },
            { id: 22, title: "July", category: "July pdf", fileName: "July-1987.pdf", },
            { id: 23, title: "July", category: "July pdf", fileName: "July-1972.pdf" },
            { id: 24, title: "March", category: "March pdf", fileName: "March-1974.pdf", },
            { id: 25, title: "May", category: "May pdf", fileName: "May-1972.pdf" },
            { id: 26, title: "Sivan", category: "Sivan pdf", fileName: "90-Sivan.pdf", },



            // Add your remaining 90+ documents here...
            // Make sure each has unique id, title, category, and fileName matching your actual PDF files
        ];
    }

    // --- 4. DOM ELEMENT REFERENCES ---
    const languageSelect = document.getElementById('language-select');
    const mainSearchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const documentList = document.getElementById('document-list');
    const docCount = document.getElementById('doc-count');
    const pagination = document.getElementById('pagination');

    const lessonSearchInput = document.getElementById('lessons-search');
    const lessonList = document.getElementById('lessons-list');
    const quarterPills = document.querySelectorAll('.quarter-pill');

    // Modal elements
    const modal = document.getElementById('pdf-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalClose = document.getElementById('modal-close');
    const pdfViewer = document.getElementById('pdf-viewer');
    const modalPrev = document.getElementById('modal-prev');
    const modalNext = document.getElementById('modal-next');
    const modalDownload = document.getElementById('modal-download');

    // --- 5. NAVIGATION ELEMENTS ---
    const navHome = document.querySelector('a[href="index.html"]');
    const navWatchOnline = document.querySelector('a[href="watch online.html"]');
    const navAboutUs = document.querySelector('a[href="about us.html"]');
    const navArchives = document.querySelector('a[href="Archive.html"]');
    const navContact = document.querySelector('a[href="contact.html"]');

    // --- 6. INITIALIZATION ---
    function init() {
        // Load data
        allDocuments = getDocumentData();

        // Setup UI
        populateCategories();
        setupEventListeners();
        setupHamburgerMenu();

        // Initial render
        handleMainFilterChange();
        handleLessonFilterChange();
        updateLanguage();
    }

    // --- 7. EVENT LISTENERS ---
    function setupEventListeners() {
        languageSelect.addEventListener('change', (e) => {
            currentLanguage = e.target.value;
            localStorage.setItem('preferredLanguage', currentLanguage);
            updateLanguage();
            renderPage(currentPage);
            renderLessonsSidebar();
            populateCategories();
        });

        mainSearchInput.addEventListener('input', handleMainFilterChange);
        categoryFilter.addEventListener('change', handleMainFilterChange);

        lessonSearchInput.addEventListener('input', handleLessonFilterChange);
        quarterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                quarterPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                currentQuarter = pill.dataset.quarter;
                handleLessonFilterChange();
            });
        });

        // Modal listeners
        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        modalPrev.addEventListener('click', showPrevDocument);
        modalNext.addEventListener('click', showNextDocument);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (modal.classList.contains('visible')) {
                if (e.key === 'Escape') closeModal();
                if (e.key === 'ArrowLeft' && !modalPrev.disabled) showPrevDocument();
                if (e.key === 'ArrowRight' && !modalNext.disabled) showNextDocument();
            }
        });
    }

    // List of categories that should appear in the Lesson Sidebar
    // Admin: Add or remove category names here to move them between the grid and sidebar
    const lessonCategories = [
        'Judah Reports', 'Sep Reports', 'm.t zion report',
        'Date Reports', 'Elul pdf', 'Sebat pdf', 'Bul pdf',
        'Chisleu pdf', 'Zif pdf', 'Zif sivan pdf', 'Zif sivan 1 pdf',
        'Tibet pdf', 'Ethanim pdf', 'Sivan pdf', 'Tebet pdf',
        'Chesleu pdf', 'Bul-chisleu pdf', 'Nisan pdf', 'July pdf', 'March pdf', 'May pdf', 'sivan', 'sebat'
    ];

    function handleMainFilterChange() {
        const searchTerm = mainSearchInput.value.toLowerCase();
        const category = categoryFilter.value;

        mainFilteredDocuments = allDocuments.filter(doc => {
            // Rule: Lessons don't show up in the main grid unless explicitly filtered by category?
            // Actually, let's keep the grid for EVERYTHING non-lesson by default, 
            // but if they pick a lesson category from the filter, show it there too.
            const isLesson = lessonCategories.includes(doc.category);
            if (isLesson && category === 'all') return false;

            const titleMatch = doc.title.toLowerCase().includes(searchTerm);
            const categoryMatch = doc.category.toLowerCase().includes(searchTerm);
            const filterMatch = (category === 'all') || (doc.category === category);

            return (titleMatch || categoryMatch) && filterMatch;
        });

        currentPage = 1;
        renderPage(currentPage);
    }

    function handleLessonFilterChange() {
        const searchTerm = lessonSearchInput.value.toLowerCase();

        lessonFilteredDocuments = allDocuments.filter(doc => {
            const isLesson = lessonCategories.includes(doc.category);
            if (!isLesson) return false;

            // Apply Quarter filter logic
            if (currentQuarter !== 'all') {
                const titleLower = doc.title.toLowerCase();
                const qKey = `q${currentQuarter}`;
                const quarterKey = `quarter ${currentQuarter}`;
                if (!titleLower.includes(qKey) && !titleLower.includes(quarterKey)) return false;
            }

            const titleMatch = doc.title.toLowerCase().includes(searchTerm);
            const categoryMatch = doc.category.toLowerCase().includes(searchTerm);

            return (titleMatch || categoryMatch);
        });

        renderLessonsSidebar();
    }

    // --- 8. RENDERING FUNCTIONS ---
    function populateCategories() {
        const t = translations[currentLanguage];
        const categories = [...new Set(allDocuments.map(doc => doc.category))];

        categoryFilter.innerHTML = `<option value="all">${t.allCategories}</option>`;
        categories.sort().forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    function renderPage(page) {
        currentPage = page;
        documentList.innerHTML = '';

        const totalDocs = mainFilteredDocuments.length;
        const totalPages = Math.ceil(totalDocs / ITEMS_PER_PAGE);

        if (totalDocs === 0) {
            renderNoDocuments();
            renderPagination(0, 0);
            return;
        }

        const start = (page - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        const paginatedDocs = mainFilteredDocuments.slice(start, end);

        paginatedDocs.forEach(doc => {
            const card = createDocumentCard(doc);
            documentList.appendChild(card);
        });

        renderPagination(totalPages, page);
        updateLanguage();
    }

    function renderLessonsSidebar() {
        lessonList.innerHTML = '';

        if (lessonFilteredDocuments.length === 0) {
            lessonList.innerHTML = '<p class="no-results-sidebar">No lessons found.</p>';
            return;
        }

        lessonFilteredDocuments.forEach(doc => {
            const card = document.createElement('div');
            card.className = 'document-card';
            card.innerHTML = `
                <div class="document-card-header">
                    <div class="document-icon">
                        <i class="fas fa-scroll"></i>
                    </div>
                    <div class="document-info">
                        <h4 class="document-title">${doc.title}</h4>
                        <span class="document-category">${doc.category}</span>
                    </div>
                </div>
                <div class="document-actions">
                    <button class="btn btn-secondary btn-icon preview-btn" title="Preview">
                        <i class="fas fa-eye"></i>
                    </button>
                    <a href="pdfs/${doc.fileName}" download="${doc.fileName}" class="btn btn-secondary btn-icon" title="Download">
                        <i class="fas fa-download"></i>
                    </a>
                </div>
            `;

            card.querySelector('.preview-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                openModal(doc.id);
            });

            card.addEventListener('click', () => openModal(doc.id));
            lessonList.appendChild(card);
        });
    }

    function createDocumentCard(doc) {
        const t = translations[currentLanguage];
        const card = document.createElement('div');
        card.className = 'document-card';

        card.innerHTML = `
            <div class="doc-card-body">
                <div class="document-icon">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <div class="document-info">
                    <h4 class="document-title">${doc.title}</h4>
                    <div class="document-meta">
                        <span class="document-category">${doc.category}</span>
                    </div>
                </div>
            </div>
            <div class="document-actions">
                <button class="btn btn-secondary btn-preview" data-id="${doc.id}">
                    <i class="fas fa-eye"></i> ${t.previewBtn}
                </button>
                <a href="pdfs/${doc.fileName}" download="${doc.fileName}" class="btn btn-primary btn-download">
                    <i class="fas fa-download"></i> ${t.downloadBtn}
                </a>
            </div>
        `;

        // Add event listener for preview button
        card.querySelector('.btn-preview').addEventListener('click', (e) => {
            e.preventDefault();
            openModal(doc.id);
        });

        // Add event listener for download button to track downloads
        card.querySelector('.btn-download').addEventListener('click', (e) => {
            showNotification(`${t.downloadBtn}: ${doc.title}`, 'success');
        });

        return card;
    }

    function renderNoDocuments() {
        const t = translations[currentLanguage];
        documentList.innerHTML = `
            <div class="no-documents">
                <i class="fas fa-file-circle-xmark"></i>
                <h4>${t.noDocuments}</h4>
                <p>${t.noDocumentsHelp}</p>
            </div>
        `;
    }

    function renderPagination(totalPages, currentPage) {
        pagination.innerHTML = '';
        if (totalPages <= 1) return;

        const t = translations[currentLanguage];

        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = `pagination-btn ${currentPage === 1 ? 'disabled' : ''}`;
        prevBtn.innerHTML = `<i class="fas fa-chevron-left"></i>`;
        prevBtn.disabled = (currentPage === 1);
        prevBtn.addEventListener('click', () => renderPage(currentPage - 1));
        pagination.appendChild(prevBtn);

        // Page numbers
        const pagesToShow = new Set([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);
        let lastPage = 0;

        for (let i = 1; i <= totalPages; i++) {
            if (pagesToShow.has(i) && i > 0 && i <= totalPages) {
                if (lastPage > 0 && i - lastPage > 1) {
                    const dots = document.createElement('span');
                    dots.textContent = '...';
                    dots.className = 'pagination-dots';
                    pagination.appendChild(dots);
                }

                const pageBtn = document.createElement('button');
                pageBtn.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
                pageBtn.textContent = i;
                pageBtn.addEventListener('click', () => renderPage(i));
                pagination.appendChild(pageBtn);
                lastPage = i;
            }
        }

        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = `pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`;
        nextBtn.innerHTML = `<i class="fas fa-chevron-right"></i>`;
        nextBtn.disabled = (currentPage === totalPages);
        nextBtn.addEventListener('click', () => renderPage(currentPage + 1));
        pagination.appendChild(nextBtn);
    }

    // --- 9. MODAL FUNCTIONS (FIXED PDF VIEWING) ---
    function openModal(docId) {
        // Search in all documents to be safe
        const doc = allDocuments.find(d => d.id === docId);

        // Navigation should ideally be based on the list you clicked from, 
        // but to keep it simple, we'll navigate through allDocuments for now
        currentPreviewIndex = allDocuments.findIndex(d => d.id === docId);

        if (!doc) return;

        // FIXED: Use direct PDF embedding instead of PDF.js viewer
        const pdfPath = `pdfs/${doc.fileName}`;

        modalTitle.textContent = doc.title;

        // Use direct PDF embedding - most modern browsers support this
        pdfViewer.src = pdfPath + '#toolbar=1&navpanes=1&scrollbar=1';

        // Set download link
        modalDownload.href = pdfPath;
        modalDownload.download = doc.fileName;

        // Update navigation buttons
        updateModalNavigation();

        modal.classList.add('visible');
        document.body.style.overflow = 'hidden';

        // Show loading state
        showNotification(`Loading: ${doc.title}`, 'info');
    }

    function closeModal() {
        modal.classList.remove('visible');
        pdfViewer.src = '';
        document.body.style.overflow = '';
        currentPreviewIndex = -1;
    }

    function showPrevDocument() {
        if (currentPreviewIndex > 0) {
            const prevDoc = allDocuments[currentPreviewIndex - 1];
            openModal(prevDoc.id);
        }
    }

    function showNextDocument() {
        if (currentPreviewIndex < allDocuments.length - 1) {
            const nextDoc = allDocuments[currentPreviewIndex + 1];
            openModal(nextDoc.id);
        }
    }

    function updateModalNavigation() {
        const t = translations[currentLanguage];

        modalPrev.disabled = currentPreviewIndex === 0;
        modalNext.disabled = currentPreviewIndex === allDocuments.length - 1;

        // Update button text
        modalPrev.innerHTML = `<i class="fas fa-arrow-left"></i> ${t.prevBtn}`;
        modalNext.innerHTML = `${t.nextBtn} <i class="fas fa-arrow-right"></i>`;
    }

    // --- 10. LANGUAGE/TRANSLATION (UPDATED WITH NAVIGATION) ---
    function updateLanguage() {
        const t = translations[currentLanguage];

        // Update all elements with data-key
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (t[key]) {
                el.textContent = t[key];
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-key-placeholder]').forEach(el => {
            const key = el.getAttribute('data-key-placeholder');
            if (t[key]) {
                el.placeholder = t[key];
            }
        });

        // Update document count
        const count = mainFilteredDocuments.length;
        docCount.textContent = `${count} ${t.docCount}`;

        // Update document title
        document.title = t.siteTitle;

        // Update navigation items
        updateNavigationText();
    }

    function updateNavigationText() {
        const t = translations[currentLanguage];

        // Update navigation text while preserving icons
        if (navHome) {
            const icon = navHome.querySelector('i').cloneNode(true);
            navHome.innerHTML = '';
            navHome.appendChild(icon);
            navHome.appendChild(document.createTextNode(` ${t.navHome}`));
        }

        if (navWatchOnline) {
            const icon = navWatchOnline.querySelector('i').cloneNode(true);
            navWatchOnline.innerHTML = '';
            navWatchOnline.appendChild(icon);
            navWatchOnline.appendChild(document.createTextNode(` ${t.navWatchOnline}`));
        }

        if (navAboutUs) {
            const icon = navAboutUs.querySelector('i').cloneNode(true);
            navAboutUs.innerHTML = '';
            navAboutUs.appendChild(icon);
            navAboutUs.appendChild(document.createTextNode(` ${t.navAboutUs}`));
        }

        if (navArchives) {
            const icon = navArchives.querySelector('i').cloneNode(true);
            navArchives.innerHTML = '';
            navArchives.appendChild(icon);
            navArchives.appendChild(document.createTextNode(` ${t.navArchives}`));
        }

        if (navContact) {
            const icon = navContact.querySelector('i').cloneNode(true);
            navContact.innerHTML = '';
            navContact.appendChild(icon);
            navContact.appendChild(document.createTextNode(` ${t.navContact}`));
        }
    }

    // --- 11. NOTIFICATION SYSTEM ---
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${getNotificationColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1001;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    function getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    function getNotificationColor(type) {
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        return colors[type] || '#3b82f6';
    }

    // Add notification styles
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(notificationStyles);

    function setupHamburgerMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        if (hamburger && navLinks) {
            hamburger.addEventListener('click', (e) => {
                e.stopPropagation();
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });

            // Close menu when clicking a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });
        }
    }

    // --- 12. LOAD PREFERENCES AND START APP ---
    function loadPreferences() {
        const savedLanguage = localStorage.getItem('preferredLanguage');
        if (savedLanguage && ['en', 'sw', 'rw'].includes(savedLanguage)) {
            currentLanguage = savedLanguage;
            languageSelect.value = currentLanguage;
        }
    }

    // Start the application
    loadPreferences();
    init();
});