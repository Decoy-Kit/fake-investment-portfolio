// Fake Investment Portfolio Application

/**
 * Internationalization (i18n) System
 * Supports automatic browser language detection for major European languages
 */
const translations = {
    en: {
        // Header
        'app.title': 'Investment Portfolio',
        'menu.currency': 'Currency:',
        'menu.showProfit': 'Show Profit/Loss',
        'menu.volatilityWarning': 'Enabling fake price changes can make your portfolio values fluctuate. This may look less believable in some contexts.',
        'menu.enableVolatility': 'Enable Fake Price Changes',
        'menu.institutionalAccount': 'Institutional Account',
        'menu.darkPoolAccess': 'Dark Pool Access',
        'menu.discountLabel': 'Discount (%):',
        'menu.screenshot': 'Screenshot Mode',
        'menu.theme': 'Theme:',
        'menu.export': 'Export',
        'menu.import': 'Import',
        'menu.reset': 'Reset',
        
        // Navigation
        'nav.portfolio': 'Portfolio',
        'nav.transactions': 'Transactions',
        'nav.analytics': 'Analytics',
        
        // Portfolio View
        'portfolio.totalValue': 'Total Portfolio Value',
        'portfolio.availableBalance': 'Available Balance',
        'portfolio.holdings': 'Holdings',
        'portfolio.addAsset': 'Add Asset',
        'portfolio.searchHoldings': 'Search holdings by symbol or name...',
        
        // Transactions View
        'transactions.title': 'Transaction History',
        'transactions.add': 'Add Transaction',
        
        // Analytics View
        'analytics.performance': 'Portfolio Performance',
        'analytics.statistics': 'Statistics',
        'analytics.totalInvested': 'Total Invested:',
        'analytics.totalReturn': 'Total Return:',
        'analytics.bestPerformer': 'Best Performer:',
        'analytics.totalTransactions': 'Total Transactions:',
        
        // Add Asset Modal
        'modal.addAsset.title': 'Add New Asset',
        'modal.addAsset.symbol': 'Symbol:',
        'modal.addAsset.symbolPlaceholder': 'e.g., AAPL, BTC',
        'modal.addAsset.name': 'Name:',
        'modal.addAsset.namePlaceholder': 'e.g., Apple Inc.',
        'modal.addAsset.quantity': 'Initial Quantity:',
        'modal.addAsset.price': 'Current Price',
        'modal.addAsset.submit': 'Add Asset',
        'modal.addAsset.cancel': 'Cancel',
        'modal.addAsset.nasdaq': 'NASDAQ',
        
        // Add Transaction Modal
        'modal.addTransaction.title': 'Add Transaction',
        'modal.addTransaction.asset': 'Asset:',
        'modal.addTransaction.selectAsset': 'Select an asset',
        'modal.addTransaction.type': 'Type:',
        'modal.addTransaction.buy': 'Buy',
        'modal.addTransaction.sell': 'Sell',
        'modal.addTransaction.quantity': 'Quantity:',
        'modal.addTransaction.price': 'Price per unit',
        'modal.addTransaction.date': 'Date:',
        'modal.addTransaction.submit': 'Add Transaction',
        'modal.addTransaction.cancel': 'Cancel',
        
        // Reset Modal
        'modal.reset.title': 'Reset Portfolio',
        'modal.reset.warning': 'Warning:',
        'modal.reset.warningText': 'This action will permanently delete all your portfolio data, including:',
        'modal.reset.item1': 'All assets and holdings',
        'modal.reset.item2': 'Transaction history',
        'modal.reset.item3': 'Portfolio balance (will reset to default)',
        'modal.reset.cannotUndo': 'This action cannot be undone.',
        'modal.reset.alsoReset': 'Also reset broker name and theme to default',
        'modal.reset.confirm': 'Yes, Reset Everything',
        'modal.reset.cancel': 'Cancel',
        
        // Import Modal
        'modal.import.title': 'Import Portfolio Data',
        'modal.import.warning': 'Warning:',
        'modal.import.warningText': 'Importing data will completely replace all current portfolio data including:',
        'modal.import.item1': 'Portfolio assets and holdings',
        'modal.import.item2': 'Transaction history',
        'modal.import.item3': 'Portfolio balance',
        'modal.import.item4': 'Settings (currency, theme, broker names)',
        'modal.import.cannotUndo': 'This action cannot be undone. Make sure to export your current data first if you want to keep it.',
        'modal.import.selectFile': 'Select File to Import',
        'modal.import.confirm': 'Import Data',
        'modal.import.cancel': 'Cancel',
        
        // Screenshot Controls
        'screenshot.generate': 'Generate Screenshot',
        'screenshot.print': 'Print Statement',
        'screenshot.copy': 'Copy Statement',
        
        // Intro Modal
        'intro.welcome': 'Welcome to Fake Investment Portfolio',
        'intro.step1.title': 'Important Security Information',
        'intro.step1.content': 'This tool helps you create fake portfolio screenshots to protect yourself from investment scammers. When sending information to potential scammers, follow these critical guidelines to ensure they cannot detect this is a fake portfolio.',
        'intro.step2.title': 'Safe Sharing Methods',
        'intro.step2.content': 'Use one of these three safe methods:',
        'intro.step2.method1': '<strong>Print Mode:</strong> Print the portfolio to PDF',
        'intro.step2.method2': '<strong>Copy to Clipboard:</strong> Copy the statement and paste into an image editor',
        'intro.step2.method3': '<strong>Screenshot Mode:</strong> Use the built-in screenshot feature',
        'intro.step3.title': 'Critical: Hide the URL Bar',
        'intro.step3.pc': '<strong>PC Screenshots (Recommended):</strong> The URL bar is typically hidden in fullscreen mode, making it harder to detect this tool.',
        'intro.step3.mobile': '<strong>Mobile Screenshots:</strong> If you must use a mobile device, you <strong>MUST ALWAYS</strong> crop away the URL bar from your screenshots. Revealing the URL exposes this tool and defeats its purpose.',
        'intro.step3.warning': '⚠️ Never share screenshots showing the website URL in the address bar!',
        'intro.step4.title': 'Powerful Features',
        'intro.step4.content': 'This tool gives you complete control:',
        'intro.step4.feature1': 'Rename the imaginary broker to any name',
        'intro.step4.feature2': 'Change themes to match different broker styles',
        'intro.step4.feature3': 'Buy and sell stocks at any price you choose',
        'intro.step4.feature4': 'Backdate transactions to any time (e.g., when scammers told you to buy)',
        'intro.step4.feature5': 'Adjust your portfolio balance freely',
        'intro.dontShowAgain': 'Don\'t show this again',
        'intro.next': 'Next',
        'intro.previous': 'Previous',
        'intro.finish': 'Get Started',
        'intro.skip': 'Skip Tutorial'
    },
    de: {
        // Header
        'app.title': 'Investmentportfolio',
        'menu.currency': 'Währung:',
        'menu.showProfit': 'Gewinn/Verlust anzeigen',
        'menu.volatilityWarning': 'Das Aktivieren falscher Preisänderungen kann dazu führen, dass Ihre Portfoliowerte schwanken. Dies kann in einigen Kontexten weniger glaubwürdig aussehen.',
        'menu.enableVolatility': 'Gefälschte Preisänderungen aktivieren',
        'menu.institutionalAccount': 'Institutionelles Konto',
        'menu.darkPoolAccess': 'Dark-Pool-Zugang',
        'menu.discountLabel': 'Rabatt (%):',
        'menu.screenshot': 'Screenshot-Modus',
        'menu.theme': 'Thema:',
        'menu.export': 'Exportieren',
        'menu.import': 'Importieren',
        'menu.reset': 'Zurücksetzen',
        
        // Navigation
        'nav.portfolio': 'Portfolio',
        'nav.transactions': 'Transaktionen',
        'nav.analytics': 'Analysen',
        
        // Portfolio View
        'portfolio.totalValue': 'Gesamtportfoliowert',
        'portfolio.availableBalance': 'Verfügbares Guthaben',
        'portfolio.holdings': 'Bestände',
        'portfolio.addAsset': 'Asset hinzufügen',
        'portfolio.searchHoldings': 'Bestände nach Symbol oder Name durchsuchen...',
        
        // Transactions View
        'transactions.title': 'Transaktionsverlauf',
        'transactions.add': 'Transaktion hinzufügen',
        
        // Analytics View
        'analytics.performance': 'Portfolio-Performance',
        'analytics.statistics': 'Statistiken',
        'analytics.totalInvested': 'Gesamt investiert:',
        'analytics.totalReturn': 'Gesamtrendite:',
        'analytics.bestPerformer': 'Beste Performance:',
        'analytics.totalTransactions': 'Gesamttransaktionen:',
        
        // Add Asset Modal
        'modal.addAsset.title': 'Neues Asset hinzufügen',
        'modal.addAsset.symbol': 'Symbol:',
        'modal.addAsset.symbolPlaceholder': 'z.B., AAPL, BTC',
        'modal.addAsset.name': 'Name:',
        'modal.addAsset.namePlaceholder': 'z.B., Apple Inc.',
        'modal.addAsset.quantity': 'Anfangsmenge:',
        'modal.addAsset.price': 'Aktueller Preis',
        'modal.addAsset.submit': 'Asset hinzufügen',
        'modal.addAsset.cancel': 'Abbrechen',
        'modal.addAsset.nasdaq': 'NASDAQ',
        
        // Add Transaction Modal
        'modal.addTransaction.title': 'Transaktion hinzufügen',
        'modal.addTransaction.asset': 'Asset:',
        'modal.addTransaction.selectAsset': 'Asset auswählen',
        'modal.addTransaction.type': 'Typ:',
        'modal.addTransaction.buy': 'Kaufen',
        'modal.addTransaction.sell': 'Verkaufen',
        'modal.addTransaction.quantity': 'Menge:',
        'modal.addTransaction.price': 'Preis pro Einheit',
        'modal.addTransaction.date': 'Datum:',
        'modal.addTransaction.submit': 'Transaktion hinzufügen',
        'modal.addTransaction.cancel': 'Abbrechen',
        
        // Reset Modal
        'modal.reset.title': 'Portfolio zurücksetzen',
        'modal.reset.warning': 'Warnung:',
        'modal.reset.warningText': 'Diese Aktion löscht dauerhaft alle Ihre Portfoliodaten, einschließlich:',
        'modal.reset.item1': 'Alle Assets und Bestände',
        'modal.reset.item2': 'Transaktionsverlauf',
        'modal.reset.item3': 'Portfolio-Guthaben (wird auf Standard zurückgesetzt)',
        'modal.reset.cannotUndo': 'Diese Aktion kann nicht rückgängig gemacht werden.',
        'modal.reset.alsoReset': 'Broker-Name und Thema auch auf Standard zurücksetzen',
        'modal.reset.confirm': 'Ja, alles zurücksetzen',
        'modal.reset.cancel': 'Abbrechen',
        
        // Import Modal
        'modal.import.title': 'Portfoliodaten importieren',
        'modal.import.warning': 'Warnung:',
        'modal.import.warningText': 'Das Importieren von Daten ersetzt vollständig alle aktuellen Portfoliodaten, einschließlich:',
        'modal.import.item1': 'Portfolio-Assets und Bestände',
        'modal.import.item2': 'Transaktionsverlauf',
        'modal.import.item3': 'Portfolio-Guthaben',
        'modal.import.item4': 'Einstellungen (Währung, Thema, Broker-Namen)',
        'modal.import.cannotUndo': 'Diese Aktion kann nicht rückgängig gemacht werden. Exportieren Sie Ihre aktuellen Daten zuerst, wenn Sie sie behalten möchten.',
        'modal.import.selectFile': 'Datei zum Importieren auswählen',
        'modal.import.confirm': 'Daten importieren',
        'modal.import.cancel': 'Abbrechen',
        
        // Screenshot Controls
        'screenshot.generate': 'Screenshot erstellen',
        'screenshot.print': 'Abrechnung drucken',
        'screenshot.copy': 'Abrechnung kopieren',
        
        // Intro Modal
        'intro.welcome': 'Willkommen bei Fake Investment Portfolio',
        'intro.step1.title': 'Wichtige Sicherheitsinformationen',
        'intro.step1.content': 'Dieses Tool hilft Ihnen, gefälschte Portfolio-Screenshots zu erstellen, um sich vor Investmentbetrügern zu schützen. Wenn Sie Informationen an potenzielle Betrüger senden, befolgen Sie diese wichtigen Richtlinien, um sicherzustellen, dass sie nicht erkennen können, dass dies ein gefälschtes Portfolio ist.',
        'intro.step2.title': 'Sichere Freigabemethoden',
        'intro.step2.content': 'Verwenden Sie eine dieser drei sicheren Methoden:',
        'intro.step2.method1': '<strong>Druckmodus:</strong> Drucken Sie das Portfolio als PDF',
        'intro.step2.method2': '<strong>In Zwischenablage kopieren:</strong> Kopieren Sie die Abrechnung und fügen Sie sie in einen Bildeditor ein',
        'intro.step2.method3': '<strong>Screenshot-Modus:</strong> Verwenden Sie die integrierte Screenshot-Funktion',
        'intro.step3.title': 'Kritisch: URL-Leiste ausblenden',
        'intro.step3.pc': '<strong>PC-Screenshots (Empfohlen):</strong> Die URL-Leiste ist normalerweise im Vollbildmodus ausgeblendet, wodurch es schwieriger wird, dieses Tool zu erkennen.',
        'intro.step3.mobile': '<strong>Mobile Screenshots:</strong> Wenn Sie ein Mobilgerät verwenden müssen, <strong>MÜSSEN Sie IMMER</strong> die URL-Leiste aus Ihren Screenshots entfernen. Das Offenlegen der URL enthüllt dieses Tool und macht seinen Zweck zunichte.',
        'intro.step3.warning': '⚠️ Teilen Sie niemals Screenshots, die die Website-URL in der Adressleiste zeigen!',
        'intro.step4.title': 'Leistungsstarke Funktionen',
        'intro.step4.content': 'Dieses Tool gibt Ihnen die volle Kontrolle:',
        'intro.step4.feature1': 'Benennen Sie den imaginären Broker in einen beliebigen Namen um',
        'intro.step4.feature2': 'Ändern Sie Themen, um verschiedene Broker-Stile anzupassen',
        'intro.step4.feature3': 'Kaufen und verkaufen Sie Aktien zu jedem gewünschten Preis',
        'intro.step4.feature4': 'Datieren Sie Transaktionen zurück auf einen beliebigen Zeitpunkt (z.B. wenn Betrüger Ihnen sagten zu kaufen)',
        'intro.step4.feature5': 'Passen Sie Ihr Portfolio-Guthaben frei an',
        'intro.dontShowAgain': 'Dies nicht mehr anzeigen',
        'intro.next': 'Weiter',
        'intro.previous': 'Zurück',
        'intro.finish': 'Jetzt starten',
        'intro.skip': 'Tutorial überspringen'
    },
    fr: {
        // Header
        'app.title': 'Portefeuille d\'investissement',
        'menu.currency': 'Devise:',
        'menu.showProfit': 'Afficher Profit/Perte',
        'menu.volatilityWarning': 'L\'activation de faux changements de prix peut faire fluctuer les valeurs de votre portefeuille. Cela peut sembler moins crédible dans certains contextes.',
        'menu.enableVolatility': 'Activer les faux changements de prix',
        'menu.institutionalAccount': 'Compte Institutionnel',
        'menu.darkPoolAccess': 'Accès Dark Pool',
        'menu.discountLabel': 'Remise (%):',
        'menu.screenshot': 'Mode Capture d\'écran',
        'menu.theme': 'Thème:',
        'menu.export': 'Exporter',
        'menu.import': 'Importer',
        'menu.reset': 'Réinitialiser',
        
        // Navigation
        'nav.portfolio': 'Portefeuille',
        'nav.transactions': 'Transactions',
        'nav.analytics': 'Analyses',
        
        // Portfolio View
        'portfolio.totalValue': 'Valeur Totale du Portefeuille',
        'portfolio.availableBalance': 'Solde Disponible',
        'portfolio.holdings': 'Avoirs',
        'portfolio.addAsset': 'Ajouter un Actif',
        'portfolio.searchHoldings': 'Rechercher des avoirs par symbole ou nom...',
        
        // Transactions View
        'transactions.title': 'Historique des Transactions',
        'transactions.add': 'Ajouter une Transaction',
        
        // Analytics View
        'analytics.performance': 'Performance du Portefeuille',
        'analytics.statistics': 'Statistiques',
        'analytics.totalInvested': 'Total Investi:',
        'analytics.totalReturn': 'Rendement Total:',
        'analytics.bestPerformer': 'Meilleure Performance:',
        'analytics.totalTransactions': 'Transactions Totales:',
        
        // Add Asset Modal
        'modal.addAsset.title': 'Ajouter un Nouvel Actif',
        'modal.addAsset.symbol': 'Symbole:',
        'modal.addAsset.symbolPlaceholder': 'ex., AAPL, BTC',
        'modal.addAsset.name': 'Nom:',
        'modal.addAsset.namePlaceholder': 'ex., Apple Inc.',
        'modal.addAsset.quantity': 'Quantité Initiale:',
        'modal.addAsset.price': 'Prix Actuel',
        'modal.addAsset.submit': 'Ajouter l\'Actif',
        'modal.addAsset.cancel': 'Annuler',
        'modal.addAsset.nasdaq': 'NASDAQ',
        
        // Add Transaction Modal
        'modal.addTransaction.title': 'Ajouter une Transaction',
        'modal.addTransaction.asset': 'Actif:',
        'modal.addTransaction.selectAsset': 'Sélectionner un actif',
        'modal.addTransaction.type': 'Type:',
        'modal.addTransaction.buy': 'Acheter',
        'modal.addTransaction.sell': 'Vendre',
        'modal.addTransaction.quantity': 'Quantité:',
        'modal.addTransaction.price': 'Prix par unité',
        'modal.addTransaction.date': 'Date:',
        'modal.addTransaction.submit': 'Ajouter la Transaction',
        'modal.addTransaction.cancel': 'Annuler',
        
        // Reset Modal
        'modal.reset.title': 'Réinitialiser le Portefeuille',
        'modal.reset.warning': 'Avertissement:',
        'modal.reset.warningText': 'Cette action supprimera définitivement toutes vos données de portefeuille, y compris:',
        'modal.reset.item1': 'Tous les actifs et avoirs',
        'modal.reset.item2': 'Historique des transactions',
        'modal.reset.item3': 'Solde du portefeuille (sera réinitialisé par défaut)',
        'modal.reset.cannotUndo': 'Cette action ne peut pas être annulée.',
        'modal.reset.alsoReset': 'Réinitialiser également le nom du courtier et le thème par défaut',
        'modal.reset.confirm': 'Oui, Tout Réinitialiser',
        'modal.reset.cancel': 'Annuler',
        
        // Import Modal
        'modal.import.title': 'Importer des Données de Portefeuille',
        'modal.import.warning': 'Avertissement:',
        'modal.import.warningText': 'L\'importation de données remplacera complètement toutes les données actuelles du portefeuille, y compris:',
        'modal.import.item1': 'Actifs et avoirs du portefeuille',
        'modal.import.item2': 'Historique des transactions',
        'modal.import.item3': 'Solde du portefeuille',
        'modal.import.item4': 'Paramètres (devise, thème, noms de courtiers)',
        'modal.import.cannotUndo': 'Cette action ne peut pas être annulée. Assurez-vous d\'exporter vos données actuelles d\'abord si vous souhaitez les conserver.',
        'modal.import.selectFile': 'Sélectionner le Fichier à Importer',
        'modal.import.confirm': 'Importer les Données',
        'modal.import.cancel': 'Annuler',
        
        // Screenshot Controls
        'screenshot.generate': 'Générer une Capture d\'écran',
        'screenshot.print': 'Imprimer le Relevé',
        'screenshot.copy': 'Copier le Relevé',
        
        // Intro Modal
        'intro.welcome': 'Bienvenue sur Fake Investment Portfolio',
        'intro.step1.title': 'Informations de Sécurité Importantes',
        'intro.step1.content': 'Cet outil vous aide à créer de fausses captures d\'écran de portefeuille pour vous protéger des escrocs en investissement. Lorsque vous envoyez des informations à des escrocs potentiels, suivez ces directives essentielles pour vous assurer qu\'ils ne peuvent pas détecter qu\'il s\'agit d\'un faux portefeuille.',
        'intro.step2.title': 'Méthodes de Partage Sécurisées',
        'intro.step2.content': 'Utilisez l\'une de ces trois méthodes sécurisées:',
        'intro.step2.method1': '<strong>Mode Impression:</strong> Imprimez le portefeuille en PDF',
        'intro.step2.method2': '<strong>Copier dans le Presse-Papiers:</strong> Copiez le relevé et collez-le dans un éditeur d\'images',
        'intro.step2.method3': '<strong>Mode Capture d\'Écran:</strong> Utilisez la fonction de capture d\'écran intégrée',
        'intro.step3.title': 'Critique: Masquer la Barre d\'URL',
        'intro.step3.pc': '<strong>Captures d\'Écran PC (Recommandé):</strong> La barre d\'URL est généralement masquée en mode plein écran, ce qui rend plus difficile la détection de cet outil.',
        'intro.step3.mobile': '<strong>Captures d\'Écran Mobile:</strong> Si vous devez utiliser un appareil mobile, vous <strong>DEVEZ TOUJOURS</strong> rogner la barre d\'URL de vos captures d\'écran. Révéler l\'URL expose cet outil et annule son but.',
        'intro.step3.warning': '⚠️ Ne partagez jamais de captures d\'écran montrant l\'URL du site dans la barre d\'adresse!',
        'intro.step4.title': 'Fonctionnalités Puissantes',
        'intro.step4.content': 'Cet outil vous donne un contrôle total:',
        'intro.step4.feature1': 'Renommez le courtier imaginaire avec n\'importe quel nom',
        'intro.step4.feature2': 'Changez les thèmes pour correspondre à différents styles de courtiers',
        'intro.step4.feature3': 'Achetez et vendez des actions au prix de votre choix',
        'intro.step4.feature4': 'Antidatez les transactions à n\'importe quel moment (par ex. quand les escrocs vous ont dit d\'acheter)',
        'intro.step4.feature5': 'Ajustez librement le solde de votre portefeuille',
        'intro.dontShowAgain': 'Ne plus afficher',
        'intro.next': 'Suivant',
        'intro.previous': 'Précédent',
        'intro.finish': 'Commencer',
        'intro.skip': 'Ignorer le Tutoriel'
    },
    es: {
        // Header
        'app.title': 'Cartera de Inversión',
        'menu.currency': 'Moneda:',
        'menu.showProfit': 'Mostrar Ganancia/Pérdida',
        'menu.volatilityWarning': 'Habilitar cambios de precios falsos puede hacer que los valores de su cartera fluctúen. Esto puede parecer menos creíble en algunos contextos.',
        'menu.enableVolatility': 'Habilitar cambios de precios falsos',
        'menu.institutionalAccount': 'Cuenta Institucional',
        'menu.darkPoolAccess': 'Acceso Dark Pool',
        'menu.discountLabel': 'Descuento (%):',
        'menu.screenshot': 'Modo Captura de Pantalla',
        'menu.theme': 'Tema',
        'menu.export': 'Exportar',
        'menu.import': 'Importar',
        'menu.reset': 'Restablecer',
        
        // Navigation
        'nav.portfolio': 'Cartera',
        'nav.transactions': 'Transacciones',
        'nav.analytics': 'Análisis',
        
        // Portfolio View
        'portfolio.totalValue': 'Valor Total de la Cartera',
        'portfolio.availableBalance': 'Saldo Disponible',
        'portfolio.holdings': 'Tenencias',
        'portfolio.addAsset': 'Agregar Activo',
        'portfolio.searchHoldings': 'Buscar tenencias por símbolo o nombre...',
        
        // Transactions View
        'transactions.title': 'Historial de Transacciones',
        'transactions.add': 'Agregar Transacción',
        
        // Analytics View
        'analytics.performance': 'Rendimiento de la Cartera',
        'analytics.statistics': 'Estadísticas',
        'analytics.totalInvested': 'Total Invertido:',
        'analytics.totalReturn': 'Rendimiento Total:',
        'analytics.bestPerformer': 'Mejor Rendimiento:',
        'analytics.totalTransactions': 'Transacciones Totales:',
        
        // Add Asset Modal
        'modal.addAsset.title': 'Agregar Nuevo Activo',
        'modal.addAsset.symbol': 'Símbolo:',
        'modal.addAsset.symbolPlaceholder': 'ej., AAPL, BTC',
        'modal.addAsset.name': 'Nombre:',
        'modal.addAsset.namePlaceholder': 'ej., Apple Inc.',
        'modal.addAsset.quantity': 'Cantidad Inicial:',
        'modal.addAsset.price': 'Precio Actual',
        'modal.addAsset.submit': 'Agregar Activo',
        'modal.addAsset.cancel': 'Cancelar',
        'modal.addAsset.nasdaq': 'NASDAQ',
        
        // Add Transaction Modal
        'modal.addTransaction.title': 'Agregar Transacción',
        'modal.addTransaction.asset': 'Activo:',
        'modal.addTransaction.selectAsset': 'Seleccionar un activo',
        'modal.addTransaction.type': 'Tipo:',
        'modal.addTransaction.buy': 'Comprar',
        'modal.addTransaction.sell': 'Vender',
        'modal.addTransaction.quantity': 'Cantidad:',
        'modal.addTransaction.price': 'Precio por unidad',
        'modal.addTransaction.date': 'Fecha:',
        'modal.addTransaction.submit': 'Agregar Transacción',
        'modal.addTransaction.cancel': 'Cancelar',
        
        // Reset Modal
        'modal.reset.title': 'Restablecer Cartera',
        'modal.reset.warning': 'Advertencia:',
        'modal.reset.warningText': 'Esta acción eliminará permanentemente todos los datos de su cartera, incluyendo:',
        'modal.reset.item1': 'Todos los activos y tenencias',
        'modal.reset.item2': 'Historial de transacciones',
        'modal.reset.item3': 'Saldo de la cartera (se restablecerá por defecto)',
        'modal.reset.cannotUndo': 'Esta acción no se puede deshacer.',
        'modal.reset.alsoReset': 'También restablecer el nombre del corredor y el tema por defecto',
        'modal.reset.confirm': 'Sí, Restablecer Todo',
        'modal.reset.cancel': 'Cancelar',
        
        // Import Modal
        'modal.import.title': 'Importar Datos de Cartera',
        'modal.import.warning': 'Advertencia:',
        'modal.import.warningText': 'Importar datos reemplazará completamente todos los datos actuales de la cartera, incluyendo:',
        'modal.import.item1': 'Activos y tenencias de la cartera',
        'modal.import.item2': 'Historial de transacciones',
        'modal.import.item3': 'Saldo de la cartera',
        'modal.import.item4': 'Configuración (moneda, tema, nombres de corredores)',
        'modal.import.cannotUndo': 'Esta acción no se puede deshacer. Asegúrese de exportar sus datos actuales primero si desea conservarlos.',
        'modal.import.selectFile': 'Seleccionar Archivo para Importar',
        'modal.import.confirm': 'Importar Datos',
        'modal.import.cancel': 'Cancelar',
        
        // Screenshot Controls
        'screenshot.generate': 'Generar Captura de Pantalla',
        'screenshot.print': 'Imprimir Estado de Cuenta',
        'screenshot.copy': 'Copiar Estado de Cuenta',
        
        // Intro Modal
        'intro.welcome': 'Bienvenido a Fake Investment Portfolio',
        'intro.step1.title': 'Información de Seguridad Importante',
        'intro.step1.content': 'Esta herramienta le ayuda a crear capturas de pantalla de cartera falsas para protegerse de estafadores de inversión. Al enviar información a posibles estafadores, siga estas pautas críticas para asegurarse de que no puedan detectar que se trata de una cartera falsa.',
        'intro.step2.title': 'Métodos de Compartir Seguros',
        'intro.step2.content': 'Use uno de estos tres métodos seguros:',
        'intro.step2.method1': '<strong>Modo Imprimir:</strong> Imprima la cartera en PDF',
        'intro.step2.method2': '<strong>Copiar al Portapapeles:</strong> Copie el estado de cuenta y péguelo en un editor de imágenes',
        'intro.step2.method3': '<strong>Modo Captura de Pantalla:</strong> Use la función de captura de pantalla integrada',
        'intro.step3.title': 'Crítico: Ocultar la Barra de URL',
        'intro.step3.pc': '<strong>Capturas de Pantalla en PC (Recomendado):</strong> La barra de URL generalmente está oculta en modo de pantalla completa, lo que hace más difícil detectar esta herramienta.',
        'intro.step3.mobile': '<strong>Capturas de Pantalla Móviles:</strong> Si debe usar un dispositivo móvil, <strong>SIEMPRE DEBE</strong> recortar la barra de URL de sus capturas de pantalla. Revelar la URL expone esta herramienta y anula su propósito.',
        'intro.step3.warning': '⚠️ ¡Nunca comparta capturas de pantalla que muestren la URL del sitio web en la barra de direcciones!',
        'intro.step4.title': 'Funciones Poderosas',
        'intro.step4.content': 'Esta herramienta le da control total:',
        'intro.step4.feature1': 'Renombre el corredor imaginario a cualquier nombre',
        'intro.step4.feature2': 'Cambie temas para que coincidan con diferentes estilos de corredores',
        'intro.step4.feature3': 'Compre y venda acciones al precio que elija',
        'intro.step4.feature4': 'Retrodate transacciones a cualquier momento (por ej. cuando los estafadores le dijeron que comprara)',
        'intro.step4.feature5': 'Ajuste el saldo de su cartera libremente',
        'intro.dontShowAgain': 'No mostrar de nuevo',
        'intro.next': 'Siguiente',
        'intro.previous': 'Anterior',
        'intro.finish': 'Comenzar',
        'intro.skip': 'Saltar Tutorial'
    },
    it: {
        // Header
        'app.title': 'Portafoglio Investimenti',
        'menu.currency': 'Valuta:',
        'menu.showProfit': 'Mostra Profitto/Perdita',
        'menu.volatilityWarning': 'L\'attivazione di falsi cambiamenti di prezzo può far fluttuare i valori del tuo portafoglio. Questo potrebbe sembrare meno credibile in alcuni contesti.',
        'menu.enableVolatility': 'Abilita falsi cambiamenti di prezzo',
        'menu.institutionalAccount': 'Conto Istituzionale',
        'menu.darkPoolAccess': 'Accesso Dark Pool',
        'menu.discountLabel': 'Sconto (%):',
        'menu.screenshot': 'Modalità Screenshot',
        'menu.theme': 'Tema:',
        'menu.export': 'Esporta',
        'menu.import': 'Importa',
        'menu.reset': 'Ripristina',
        
        // Navigation
        'nav.portfolio': 'Portafoglio',
        'nav.transactions': 'Transazioni',
        'nav.analytics': 'Analisi',
        
        // Portfolio View
        'portfolio.totalValue': 'Valore Totale del Portafoglio',
        'portfolio.availableBalance': 'Saldo Disponibile',
        'portfolio.holdings': 'Partecipazioni',
        'portfolio.addAsset': 'Aggiungi Asset',
        'portfolio.searchHoldings': 'Cerca partecipazioni per simbolo o nome...',
        
        // Transactions View
        'transactions.title': 'Storico Transazioni',
        'transactions.add': 'Aggiungi Transazione',
        
        // Analytics View
        'analytics.performance': 'Performance del Portafoglio',
        'analytics.statistics': 'Statistiche',
        'analytics.totalInvested': 'Totale Investito:',
        'analytics.totalReturn': 'Rendimento Totale:',
        'analytics.bestPerformer': 'Miglior Performance:',
        'analytics.totalTransactions': 'Transazioni Totali:',
        
        // Add Asset Modal
        'modal.addAsset.title': 'Aggiungi Nuovo Asset',
        'modal.addAsset.symbol': 'Simbolo:',
        'modal.addAsset.symbolPlaceholder': 'es., AAPL, BTC',
        'modal.addAsset.name': 'Nome:',
        'modal.addAsset.namePlaceholder': 'es., Apple Inc.',
        'modal.addAsset.quantity': 'Quantità Iniziale:',
        'modal.addAsset.price': 'Prezzo Attuale',
        'modal.addAsset.submit': 'Aggiungi Asset',
        'modal.addAsset.cancel': 'Annulla',
        'modal.addAsset.nasdaq': 'NASDAQ',
        
        // Add Transaction Modal
        'modal.addTransaction.title': 'Aggiungi Transazione',
        'modal.addTransaction.asset': 'Asset:',
        'modal.addTransaction.selectAsset': 'Seleziona un asset',
        'modal.addTransaction.type': 'Tipo:',
        'modal.addTransaction.buy': 'Acquista',
        'modal.addTransaction.sell': 'Vendi',
        'modal.addTransaction.quantity': 'Quantità:',
        'modal.addTransaction.price': 'Prezzo per unità',
        'modal.addTransaction.date': 'Data:',
        'modal.addTransaction.submit': 'Aggiungi Transazione',
        'modal.addTransaction.cancel': 'Annulla',
        
        // Reset Modal
        'modal.reset.title': 'Ripristina Portafoglio',
        'modal.reset.warning': 'Avviso:',
        'modal.reset.warningText': 'Questa azione eliminerà permanentemente tutti i dati del portafoglio, inclusi:',
        'modal.reset.item1': 'Tutti gli asset e le partecipazioni',
        'modal.reset.item2': 'Storico transazioni',
        'modal.reset.item3': 'Saldo del portafoglio (verrà ripristinato al valore predefinito)',
        'modal.reset.cannotUndo': 'Questa azione non può essere annullata.',
        'modal.reset.alsoReset': 'Ripristina anche il nome del broker e il tema predefinito',
        'modal.reset.confirm': 'Sì, Ripristina Tutto',
        'modal.reset.cancel': 'Annulla',
        
        // Import Modal
        'modal.import.title': 'Importa Dati Portafoglio',
        'modal.import.warning': 'Avviso:',
        'modal.import.warningText': 'L\'importazione dei dati sostituirà completamente tutti i dati attuali del portafoglio, inclusi:',
        'modal.import.item1': 'Asset e partecipazioni del portafoglio',
        'modal.import.item2': 'Storico transazioni',
        'modal.import.item3': 'Saldo del portafoglio',
        'modal.import.item4': 'Impostazioni (valuta, tema, nomi broker)',
        'modal.import.cannotUndo': 'Questa azione non può essere annullata. Assicurati di esportare prima i tuoi dati attuali se desideri conservarli.',
        'modal.import.selectFile': 'Seleziona File da Importare',
        'modal.import.confirm': 'Importa Dati',
        'modal.import.cancel': 'Annulla',
        
        // Screenshot Controls
        'screenshot.generate': 'Genera Screenshot',
        'screenshot.print': 'Stampa Resoconto',
        'screenshot.copy': 'Copia Resoconto',
        
        // Intro Modal
        'intro.welcome': 'Benvenuto in Fake Investment Portfolio',
        'intro.step1.title': 'Informazioni di Sicurezza Importanti',
        'intro.step1.content': 'Questo strumento ti aiuta a creare screenshot di portafoglio falsi per proteggerti dai truffatori di investimenti. Quando invii informazioni a potenziali truffatori, segui queste linee guida critiche per assicurarti che non possano rilevare che si tratta di un portafoglio falso.',
        'intro.step2.title': 'Metodi di Condivisione Sicuri',
        'intro.step2.content': 'Usa uno di questi tre metodi sicuri:',
        'intro.step2.method1': '<strong>Modalità Stampa:</strong> Stampa il portafoglio in PDF',
        'intro.step2.method2': '<strong>Copia negli Appunti:</strong> Copia il resoconto e incollalo in un editor di immagini',
        'intro.step2.method3': '<strong>Modalità Screenshot:</strong> Usa la funzione screenshot integrata',
        'intro.step3.title': 'Critico: Nascondi la Barra URL',
        'intro.step3.pc': '<strong>Screenshot da PC (Consigliato):</strong> La barra URL è generalmente nascosta in modalità schermo intero, rendendo più difficile rilevare questo strumento.',
        'intro.step3.mobile': '<strong>Screenshot da Mobile:</strong> Se devi usare un dispositivo mobile, <strong>DEVI SEMPRE</strong> ritagliare la barra URL dai tuoi screenshot. Rivelare l\'URL espone questo strumento e ne vanifica lo scopo.',
        'intro.step3.warning': '⚠️ Non condividere mai screenshot che mostrano l\'URL del sito nella barra degli indirizzi!',
        'intro.step4.title': 'Funzionalità Potenti',
        'intro.step4.content': 'Questo strumento ti dà il controllo completo:',
        'intro.step4.feature1': 'Rinomina il broker immaginario con qualsiasi nome',
        'intro.step4.feature2': 'Cambia temi per abbinare diversi stili di broker',
        'intro.step4.feature3': 'Compra e vendi azioni al prezzo che scegli',
        'intro.step4.feature4': 'Retrodatare le transazioni a qualsiasi momento (es. quando i truffatori ti hanno detto di comprare)',
        'intro.step4.feature5': 'Regola liberamente il saldo del tuo portafoglio',
        'intro.dontShowAgain': 'Non mostrare più',
        'intro.next': 'Avanti',
        'intro.previous': 'Indietro',
        'intro.finish': 'Inizia',
        'intro.skip': 'Salta Tutorial'
    },
    pt: {
        // Header
        'app.title': 'Carteira de Investimentos',
        'menu.currency': 'Moeda:',
        'menu.showProfit': 'Mostrar Lucro/Prejuízo',
        'menu.volatilityWarning': 'Habilitar mudanças de preços falsas pode fazer com que os valores da sua carteira flutuem. Isso pode parecer menos crível em alguns contextos.',
        'menu.enableVolatility': 'Habilitar mudanças de preços falsas',
        'menu.institutionalAccount': 'Conta Institucional',
        'menu.darkPoolAccess': 'Acesso Dark Pool',
        'menu.discountLabel': 'Desconto (%):',
        'menu.screenshot': 'Modo Captura de Tela',
        'menu.theme': 'Tema:',
        'menu.export': 'Exportar',
        'menu.import': 'Importar',
        'menu.reset': 'Redefinir',
        
        // Navigation
        'nav.portfolio': 'Carteira',
        'nav.transactions': 'Transações',
        'nav.analytics': 'Análises',
        
        // Portfolio View
        'portfolio.totalValue': 'Valor Total da Carteira',
        'portfolio.availableBalance': 'Saldo Disponível',
        'portfolio.holdings': 'Participações',
        'portfolio.addAsset': 'Adicionar Ativo',
        'portfolio.searchHoldings': 'Pesquisar participações por símbolo ou nome...',
        
        // Transactions View
        'transactions.title': 'Histórico de Transações',
        'transactions.add': 'Adicionar Transação',
        
        // Analytics View
        'analytics.performance': 'Desempenho da Carteira',
        'analytics.statistics': 'Estatísticas',
        'analytics.totalInvested': 'Total Investido:',
        'analytics.totalReturn': 'Retorno Total:',
        'analytics.bestPerformer': 'Melhor Desempenho:',
        'analytics.totalTransactions': 'Transações Totais:',
        
        // Add Asset Modal
        'modal.addAsset.title': 'Adicionar Novo Ativo',
        'modal.addAsset.symbol': 'Símbolo:',
        'modal.addAsset.symbolPlaceholder': 'ex., AAPL, BTC',
        'modal.addAsset.name': 'Nome:',
        'modal.addAsset.namePlaceholder': 'ex., Apple Inc.',
        'modal.addAsset.quantity': 'Quantidade Inicial:',
        'modal.addAsset.price': 'Preço Atual',
        'modal.addAsset.submit': 'Adicionar Ativo',
        'modal.addAsset.cancel': 'Cancelar',
        'modal.addAsset.nasdaq': 'NASDAQ',
        
        // Add Transaction Modal
        'modal.addTransaction.title': 'Adicionar Transação',
        'modal.addTransaction.asset': 'Ativo:',
        'modal.addTransaction.selectAsset': 'Selecionar um ativo',
        'modal.addTransaction.type': 'Tipo:',
        'modal.addTransaction.buy': 'Comprar',
        'modal.addTransaction.sell': 'Vender',
        'modal.addTransaction.quantity': 'Quantidade:',
        'modal.addTransaction.price': 'Preço por unidade',
        'modal.addTransaction.date': 'Data:',
        'modal.addTransaction.submit': 'Adicionar Transação',
        'modal.addTransaction.cancel': 'Cancelar',
        
        // Reset Modal
        'modal.reset.title': 'Redefinir Carteira',
        'modal.reset.warning': 'Aviso:',
        'modal.reset.warningText': 'Esta ação excluirá permanentemente todos os dados da sua carteira, incluindo:',
        'modal.reset.item1': 'Todos os ativos e participações',
        'modal.reset.item2': 'Histórico de transações',
        'modal.reset.item3': 'Saldo da carteira (será redefinido para o padrão)',
        'modal.reset.cannotUndo': 'Esta ação não pode ser desfeita.',
        'modal.reset.alsoReset': 'Também redefinir o nome da corretora e o tema para o padrão',
        'modal.reset.confirm': 'Sim, Redefinir Tudo',
        'modal.reset.cancel': 'Cancelar',
        
        // Import Modal
        'modal.import.title': 'Importar Dados da Carteira',
        'modal.import.warning': 'Aviso:',
        'modal.import.warningText': 'Importar dados substituirá completamente todos os dados atuais da carteira, incluindo:',
        'modal.import.item1': 'Ativos e participações da carteira',
        'modal.import.item2': 'Histórico de transações',
        'modal.import.item3': 'Saldo da carteira',
        'modal.import.item4': 'Configurações (moeda, tema, nomes de corretoras)',
        'modal.import.cannotUndo': 'Esta ação não pode ser desfeita. Certifique-se de exportar seus dados atuais primeiro se quiser mantê-los.',
        'modal.import.selectFile': 'Selecionar Arquivo para Importar',
        'modal.import.confirm': 'Importar Dados',
        'modal.import.cancel': 'Cancelar',
        
        // Screenshot Controls
        'screenshot.generate': 'Gerar Captura de Tela',
        'screenshot.print': 'Imprimir Extrato',
        'screenshot.copy': 'Copiar Extrato',
        
        // Intro Modal
        'intro.welcome': 'Bem-vindo ao Fake Investment Portfolio',
        'intro.step1.title': 'Informações de Segurança Importantes',
        'intro.step1.content': 'Esta ferramenta ajuda você a criar capturas de tela falsas de carteira para se proteger de golpistas de investimento. Ao enviar informações para potenciais golpistas, siga estas diretrizes críticas para garantir que eles não possam detectar que esta é uma carteira falsa.',
        'intro.step2.title': 'Métodos de Compartilhamento Seguros',
        'intro.step2.content': 'Use um destes três métodos seguros:',
        'intro.step2.method1': '<strong>Modo Impressão:</strong> Imprima a carteira em PDF',
        'intro.step2.method2': '<strong>Copiar para Área de Transferência:</strong> Copie o extrato e cole em um editor de imagens',
        'intro.step2.method3': '<strong>Modo Captura de Tela:</strong> Use a função de captura de tela integrada',
        'intro.step3.title': 'Crítico: Ocultar a Barra de URL',
        'intro.step3.pc': '<strong>Capturas de Tela em PC (Recomendado):</strong> A barra de URL geralmente está oculta no modo tela cheia, tornando mais difícil detectar esta ferramenta.',
        'intro.step3.mobile': '<strong>Capturas de Tela Móveis:</strong> Se você precisar usar um dispositivo móvel, você <strong>SEMPRE DEVE</strong> cortar a barra de URL de suas capturas de tela. Revelar a URL expõe esta ferramenta e anula seu propósito.',
        'intro.step3.warning': '⚠️ Nunca compartilhe capturas de tela mostrando a URL do site na barra de endereços!',
        'intro.step4.title': 'Recursos Poderosos',
        'intro.step4.content': 'Esta ferramenta dá a você controle total:',
        'intro.step4.feature1': 'Renomeie a corretora imaginária para qualquer nome',
        'intro.step4.feature2': 'Mude temas para combinar com diferentes estilos de corretoras',
        'intro.step4.feature3': 'Compre e venda ações ao preço que você escolher',
        'intro.step4.feature4': 'Retrodate transações para qualquer momento (por ex. quando os golpistas lhe disseram para comprar)',
        'intro.step4.feature5': 'Ajuste o saldo da sua carteira livremente',
        'intro.dontShowAgain': 'Não mostrar novamente',
        'intro.next': 'Próximo',
        'intro.previous': 'Anterior',
        'intro.finish': 'Começar',
        'intro.skip': 'Pular Tutorial'
    },
    nl: {
        // Header
        'app.title': 'Beleggingsportefeuille',
        'menu.currency': 'Valuta:',
        'menu.showProfit': 'Winst/Verlies Tonen',
        'menu.volatilityWarning': 'Het inschakelen van nep prijswijzigingen kan ervoor zorgen dat uw portfoliowaarden fluctueren. Dit kan er in sommige contexten minder geloofwaardig uitzien.',
        'menu.enableVolatility': 'Nep prijswijzigingen inschakelen',
        'menu.institutionalAccount': 'Institutioneel Account',
        'menu.darkPoolAccess': 'Dark Pool Toegang',
        'menu.discountLabel': 'Korting (%):',
        'menu.screenshot': 'Screenshot-modus',
        'menu.theme': 'Thema:',
        'menu.export': 'Exporteren',
        'menu.import': 'Importeren',
        'menu.reset': 'Resetten',
        
        // Navigation
        'nav.portfolio': 'Portefeuille',
        'nav.transactions': 'Transacties',
        'nav.analytics': 'Analyses',
        
        // Portfolio View
        'portfolio.totalValue': 'Totale Portefeuillewaarde',
        'portfolio.availableBalance': 'Beschikbaar Saldo',
        'portfolio.holdings': 'Bezittingen',
        'portfolio.addAsset': 'Activum Toevoegen',
        'portfolio.searchHoldings': 'Zoek bezittingen op symbool of naam...',
        
        // Transactions View
        'transactions.title': 'Transactiegeschiedenis',
        'transactions.add': 'Transactie Toevoegen',
        
        // Analytics View
        'analytics.performance': 'Portefeuilleprestaties',
        'analytics.statistics': 'Statistieken',
        'analytics.totalInvested': 'Totaal Geïnvesteerd:',
        'analytics.totalReturn': 'Totaal Rendement:',
        'analytics.bestPerformer': 'Beste Prestatie:',
        'analytics.totalTransactions': 'Totaal Transacties:',
        
        // Add Asset Modal
        'modal.addAsset.title': 'Nieuw Activum Toevoegen',
        'modal.addAsset.symbol': 'Symbool:',
        'modal.addAsset.symbolPlaceholder': 'bijv., AAPL, BTC',
        'modal.addAsset.name': 'Naam:',
        'modal.addAsset.namePlaceholder': 'bijv., Apple Inc.',
        'modal.addAsset.quantity': 'Beginhoeveelheid:',
        'modal.addAsset.price': 'Huidige Prijs',
        'modal.addAsset.submit': 'Activum Toevoegen',
        'modal.addAsset.cancel': 'Annuleren',
        'modal.addAsset.nasdaq': 'NASDAQ',
        
        // Add Transaction Modal
        'modal.addTransaction.title': 'Transactie Toevoegen',
        'modal.addTransaction.asset': 'Activum:',
        'modal.addTransaction.selectAsset': 'Selecteer een activum',
        'modal.addTransaction.type': 'Type:',
        'modal.addTransaction.buy': 'Kopen',
        'modal.addTransaction.sell': 'Verkopen',
        'modal.addTransaction.quantity': 'Hoeveelheid:',
        'modal.addTransaction.price': 'Prijs per eenheid',
        'modal.addTransaction.date': 'Datum:',
        'modal.addTransaction.submit': 'Transactie Toevoegen',
        'modal.addTransaction.cancel': 'Annuleren',
        
        // Reset Modal
        'modal.reset.title': 'Portefeuille Resetten',
        'modal.reset.warning': 'Waarschuwing:',
        'modal.reset.warningText': 'Deze actie zal permanent al uw portefeuillegegevens verwijderen, inclusief:',
        'modal.reset.item1': 'Alle activa en bezittingen',
        'modal.reset.item2': 'Transactiegeschiedenis',
        'modal.reset.item3': 'Portefeuillesaldo (wordt gereset naar standaard)',
        'modal.reset.cannotUndo': 'Deze actie kan niet ongedaan worden gemaakt.',
        'modal.reset.alsoReset': 'Ook brokernaam en thema resetten naar standaard',
        'modal.reset.confirm': 'Ja, Reset Alles',
        'modal.reset.cancel': 'Annuleren',
        
        // Import Modal
        'modal.import.title': 'Portefeuillegegevens Importeren',
        'modal.import.warning': 'Waarschuwing:',
        'modal.import.warningText': 'Het importeren van gegevens vervangt volledig alle huidige portefeuillegegevens, inclusief:',
        'modal.import.item1': 'Portefeuille-activa en bezittingen',
        'modal.import.item2': 'Transactiegeschiedenis',
        'modal.import.item3': 'Portefeuillesaldo',
        'modal.import.item4': 'Instellingen (valuta, thema, brokernamen)',
        'modal.import.cannotUndo': 'Deze actie kan niet ongedaan worden gemaakt. Zorg ervoor dat u eerst uw huidige gegevens exporteert als u ze wilt behouden.',
        'modal.import.selectFile': 'Selecteer Bestand om te Importeren',
        'modal.import.confirm': 'Gegevens Importeren',
        'modal.import.cancel': 'Annuleren',
        
        // Screenshot Controls
        'screenshot.generate': 'Screenshot Genereren',
        'screenshot.print': 'Afschrift Afdrukken',
        'screenshot.copy': 'Afschrift Kopiëren',
        
        // Intro Modal
        'intro.welcome': 'Welkom bij Fake Investment Portfolio',
        'intro.step1.title': 'Belangrijke Beveiligingsinformatie',
        'intro.step1.content': 'Deze tool helpt u nep portefeuille-screenshots te maken om uzelf te beschermen tegen investeringsoplichters. Bij het verzenden van informatie naar potentiële oplichters, volg deze kritieke richtlijnen om ervoor te zorgen dat ze niet kunnen detecteren dat dit een nep portefeuille is.',
        'intro.step2.title': 'Veilige Deelmethoden',
        'intro.step2.content': 'Gebruik een van deze drie veilige methoden:',
        'intro.step2.method1': '<strong>Afdrukmodus:</strong> Druk de portefeuille af naar PDF',
        'intro.step2.method2': '<strong>Kopiëren naar Klembord:</strong> Kopieer het afschrift en plak in een beeldeditor',
        'intro.step2.method3': '<strong>Screenshot-modus:</strong> Gebruik de ingebouwde screenshot-functie',
        'intro.step3.title': 'Kritiek: Verberg de URL-balk',
        'intro.step3.pc': '<strong>PC Screenshots (Aanbevolen):</strong> De URL-balk is meestal verborgen in volledig scherm modus, waardoor het moeilijker is om deze tool te detecteren.',
        'intro.step3.mobile': '<strong>Mobiele Screenshots:</strong> Als u een mobiel apparaat moet gebruiken, <strong>MOET u ALTIJD</strong> de URL-balk uit uw screenshots bijsnijden. Het onthullen van de URL onthult deze tool en ondermijnt het doel ervan.',
        'intro.step3.warning': '⚠️ Deel nooit screenshots die de website-URL in de adresbalk tonen!',
        'intro.step4.title': 'Krachtige Functies',
        'intro.step4.content': 'Deze tool geeft u volledige controle:',
        'intro.step4.feature1': 'Hernoem de denkbeeldige broker naar elke naam',
        'intro.step4.feature2': 'Wijzig thema\'s om verschillende broker-stijlen te matchen',
        'intro.step4.feature3': 'Koop en verkoop aandelen tegen elke prijs die u kiest',
        'intro.step4.feature4': 'Dateer transacties terug naar elk moment (bijv. wanneer oplichters u vertelden te kopen)',
        'intro.step4.feature5': 'Pas uw portefeuillesaldo vrij aan',
        'intro.dontShowAgain': 'Dit niet meer tonen',
        'intro.next': 'Volgende',
        'intro.previous': 'Vorige',
        'intro.finish': 'Aan de Slag',
        'intro.skip': 'Tutorial Overslaan'
    },
    pl: {
        // Header
        'app.title': 'Portfel Inwestycyjny',
        'menu.currency': 'Waluta:',
        'menu.showProfit': 'Pokaż Zysk/Stratę',
        'menu.volatilityWarning': 'Włączenie fałszywych zmian cen może spowodować fluktuacje wartości Twojego portfela. Może to wyglądać mniej wiarygodnie w niektórych kontekstach.',
        'menu.enableVolatility': 'Włącz fałszywe zmiany cen',
        'menu.institutionalAccount': 'Konto Instytucjonalne',
        'menu.darkPoolAccess': 'Dostęp do Dark Pool',
        'menu.discountLabel': 'Zniżka (%):',
        'menu.screenshot': 'Tryb Zrzutu Ekranu',
        'menu.theme': 'Motyw:',
        'menu.export': 'Eksportuj',
        'menu.import': 'Importuj',
        'menu.reset': 'Resetuj',
        
        // Navigation
        'nav.portfolio': 'Portfel',
        'nav.transactions': 'Transakcje',
        'nav.analytics': 'Analizy',
        
        // Portfolio View
        'portfolio.totalValue': 'Całkowita Wartość Portfela',
        'portfolio.availableBalance': 'Dostępne Saldo',
        'portfolio.holdings': 'Udziały',
        'portfolio.addAsset': 'Dodaj Aktywo',
        'portfolio.searchHoldings': 'Szukaj udziałów po symbolu lub nazwie...',
        
        // Transactions View
        'transactions.title': 'Historia Transakcji',
        'transactions.add': 'Dodaj Transakcję',
        
        // Analytics View
        'analytics.performance': 'Wydajność Portfela',
        'analytics.statistics': 'Statystyki',
        'analytics.totalInvested': 'Łącznie Zainwestowano:',
        'analytics.totalReturn': 'Całkowity Zwrot:',
        'analytics.bestPerformer': 'Najlepsza Wydajność:',
        'analytics.totalTransactions': 'Łączne Transakcje:',
        
        // Add Asset Modal
        'modal.addAsset.title': 'Dodaj Nowe Aktywo',
        'modal.addAsset.symbol': 'Symbol:',
        'modal.addAsset.symbolPlaceholder': 'np., AAPL, BTC',
        'modal.addAsset.name': 'Nazwa:',
        'modal.addAsset.namePlaceholder': 'np., Apple Inc.',
        'modal.addAsset.quantity': 'Ilość Początkowa:',
        'modal.addAsset.price': 'Aktualna Cena',
        'modal.addAsset.submit': 'Dodaj Aktywo',
        'modal.addAsset.cancel': 'Anuluj',
        'modal.addAsset.nasdaq': 'NASDAQ',
        
        // Add Transaction Modal
        'modal.addTransaction.title': 'Dodaj Transakcję',
        'modal.addTransaction.asset': 'Aktywo:',
        'modal.addTransaction.selectAsset': 'Wybierz aktywo',
        'modal.addTransaction.type': 'Typ:',
        'modal.addTransaction.buy': 'Kup',
        'modal.addTransaction.sell': 'Sprzedaj',
        'modal.addTransaction.quantity': 'Ilość:',
        'modal.addTransaction.price': 'Cena za jednostkę',
        'modal.addTransaction.date': 'Data:',
        'modal.addTransaction.submit': 'Dodaj Transakcję',
        'modal.addTransaction.cancel': 'Anuluj',
        
        // Reset Modal
        'modal.reset.title': 'Resetuj Portfel',
        'modal.reset.warning': 'Ostrzeżenie:',
        'modal.reset.warningText': 'Ta akcja trwale usunie wszystkie dane portfela, w tym:',
        'modal.reset.item1': 'Wszystkie aktywa i udziały',
        'modal.reset.item2': 'Historia transakcji',
        'modal.reset.item3': 'Saldo portfela (zostanie zresetowane do domyślnego)',
        'modal.reset.cannotUndo': 'Tej akcji nie można cofnąć.',
        'modal.reset.alsoReset': 'Zresetuj również nazwę brokera i motyw do domyślnych',
        'modal.reset.confirm': 'Tak, Resetuj Wszystko',
        'modal.reset.cancel': 'Anuluj',
        
        // Import Modal
        'modal.import.title': 'Importuj Dane Portfela',
        'modal.import.warning': 'Ostrzeżenie:',
        'modal.import.warningText': 'Importowanie danych całkowicie zastąpi wszystkie bieżące dane portfela, w tym:',
        'modal.import.item1': 'Aktywa i udziały portfela',
        'modal.import.item2': 'Historia transakcji',
        'modal.import.item3': 'Saldo portfela',
        'modal.import.item4': 'Ustawienia (waluta, motyw, nazwy brokerów)',
        'modal.import.cannotUndo': 'Tej akcji nie można cofnąć. Upewnij się, że najpierw wyeksportujesz swoje bieżące dane, jeśli chcesz je zachować.',
        'modal.import.selectFile': 'Wybierz Plik do Importu',
        'modal.import.confirm': 'Importuj Dane',
        'modal.import.cancel': 'Anuluj',
        
        // Screenshot Controls
        'screenshot.generate': 'Generuj Zrzut Ekranu',
        'screenshot.print': 'Drukuj Wyciąg',
        'screenshot.copy': 'Kopiuj Wyciąg',
        
        // Intro Modal
        'intro.welcome': 'Witamy w Fake Investment Portfolio',
        'intro.step1.title': 'Ważne Informacje Bezpieczeństwa',
        'intro.step1.content': 'To narzędzie pomaga tworzyć fałszywe zrzuty ekranu portfela, aby chronić się przed oszustami inwestycyjnymi. Wysyłając informacje do potencjalnych oszustów, przestrzegaj tych krytycznych wskazówek, aby upewnić się, że nie mogą wykryć, że to fałszywy portfel.',
        'intro.step2.title': 'Bezpieczne Metody Udostępniania',
        'intro.step2.content': 'Użyj jednej z tych trzech bezpiecznych metod:',
        'intro.step2.method1': '<strong>Tryb Drukowania:</strong> Wydrukuj portfel do PDF',
        'intro.step2.method2': '<strong>Kopiuj do Schowka:</strong> Skopiuj wyciąg i wklej do edytora obrazów',
        'intro.step2.method3': '<strong>Tryb Zrzutu Ekranu:</strong> Użyj wbudowanej funkcji zrzutu ekranu',
        'intro.step3.title': 'Krytyczne: Ukryj Pasek URL',
        'intro.step3.pc': '<strong>Zrzuty Ekranu na PC (Zalecane):</strong> Pasek URL jest zazwyczaj ukryty w trybie pełnoekranowym, co utrudnia wykrycie tego narzędzia.',
        'intro.step3.mobile': '<strong>Zrzuty Ekranu na Telefonie:</strong> Jeśli musisz używać urządzenia mobilnego, <strong>ZAWSZE MUSISZ</strong> wykadrować pasek URL ze swoich zrzutów ekranu. Ujawnienie URL ujawnia to narzędzie i niweczy jego cel.',
        'intro.step3.warning': '⚠️ Nigdy nie udostępniaj zrzutów ekranu pokazujących URL strony w pasku adresu!',
        'intro.step4.title': 'Potężne Funkcje',
        'intro.step4.content': 'To narzędzie daje ci pełną kontrolę:',
        'intro.step4.feature1': 'Zmień nazwę wyimaginowanego brokera na dowolną',
        'intro.step4.feature2': 'Zmień motywy, aby dopasować różne style brokerów',
        'intro.step4.feature3': 'Kupuj i sprzedawaj akcje po dowolnej wybranej cenie',
        'intro.step4.feature4': 'Cofaj daty transakcji do dowolnego momentu (np. kiedy oszuści kazali ci kupić)',
        'intro.step4.feature5': 'Swobodnie dostosuj saldo portfela',
        'intro.dontShowAgain': 'Nie pokazuj ponownie',
        'intro.next': 'Dalej',
        'intro.previous': 'Wstecz',
        'intro.finish': 'Rozpocznij',
        'intro.skip': 'Pomiń Samouczek'
    }
};

/**
 * Internationalization Manager
 * Detects browser language and applies translations automatically
 */
class I18n {
    constructor() {
        this.currentLanguage = this.detectLanguage();
        this.translations = translations;
    }

    /**
     * Detect the user's browser language
     * Supports major European languages, defaults to English
     */
    detectLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        
        // Safety check for edge cases where browserLang might be undefined
        if (!browserLang) {
            console.log('Browser language not detected, defaulting to English');
            return 'en';
        }
        
        const langCode = browserLang.split('-')[0].toLowerCase();
        
        // Supported languages (excluding Russian as per requirements)
        const supportedLanguages = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'pl'];
        
        if (supportedLanguages.includes(langCode)) {
            console.log(`Detected browser language: ${langCode}`);
            return langCode;
        }
        
        console.log(`Browser language ${langCode} not supported, defaulting to English`);
        return 'en'; // Default to English
    }

    /**
     * Get translated text for a key
     * @param {string} key - Translation key
     * @returns {string} Translated text or key if not found
     */
    t(key) {
        const translation = this.translations[this.currentLanguage]?.[key];
        if (!translation) {
            console.warn(`Translation missing for key: ${key} in language: ${this.currentLanguage}`);
            return key;
        }
        return translation;
    }

    /**
     * Get current language code
     * @returns {string} Current language code
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    /**
     * Check if a string contains HTML tags
     */
    containsHTML(str) {
        return /<[a-z][\s\S]*>/i.test(str);
    }

    /**
     * Apply translations to all elements with data-i18n attribute
     */
    applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                // For input fields, update placeholder if it exists
                if (element.hasAttribute('placeholder')) {
                    element.placeholder = translation;
                }
                // For input with value, update value
                if (element.hasAttribute('value') && element.value) {
                    element.value = translation;
                }
            } else if (element.tagName === 'OPTION') {
                // For option elements, update text content
                element.textContent = translation;
            } else if (element.children.length > 0) {
                // For elements with children (like buttons with icons), preserve HTML structure
                // Check if translation contains HTML markup
                if (this.containsHTML(translation)) {
                    // Use innerHTML for translations with HTML tags
                    // SECURITY: Safe to use innerHTML here because 'translation' comes from
                    // hardcoded translations object in this file, not from user input
                    element.innerHTML = translation;
                } else {
                    // Look for text nodes or <span> elements to update
                    const textNodes = Array.from(element.childNodes).filter(
                        node => node.nodeType === Node.TEXT_NODE || 
                               (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'SPAN' && !node.classList.contains('checkmark'))
                    );
                    if (textNodes.length > 0) {
                        // Update the last text node or span (usually the text after icons)
                        const targetNode = textNodes[textNodes.length - 1];
                        if (targetNode.nodeType === Node.TEXT_NODE) {
                            targetNode.textContent = ' ' + translation;
                        } else {
                            targetNode.textContent = translation;
                        }
                    } else {
                        // No text nodes found, just update textContent (will override everything)
                        element.textContent = translation;
                    }
                }
            } else {
                // For simple elements without children, check if translation contains HTML
                if (this.containsHTML(translation)) {
                    // Use innerHTML for translations with HTML tags
                    // SECURITY: Safe to use innerHTML here because 'translation' comes from
                    // hardcoded translations object in this file, not from user input
                    element.innerHTML = translation;
                } else {
                    // Use textContent for plain text translations
                    element.textContent = translation;
                }
            }
        });

        // Update document language attribute
        document.documentElement.lang = this.currentLanguage;
        
        console.log(`Applied translations for language: ${this.currentLanguage}`);
    }
}

// Initialize i18n system
const i18n = new I18n();

/**
 * Ticker Service for fetching company ticker information
 * Provides company name lookup for stock symbols with fallback data
 */
class TickerService {
    constructor() {
        this.tickerData = null;
        this.secEndpoint = 'https://www.sec.gov/files/company_tickers_exchange.json';
        this.localTickerFile = './company_tickers_exchange.json';
        this.fallbackTickers = null;
        this.initialized = false;
    }

    /**
     * Initialize the ticker service by attempting to fetch SEC data
     */
    async initialize() {
        if (this.initialized) return;
        
        try {
            console.log('Attempting to fetch SEC ticker data...');
            const response = await fetch(this.secEndpoint);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            this.tickerData = this.processSECData(data);
            console.log(`Successfully loaded ${Object.keys(this.tickerData).length} tickers from SEC`);
        } catch (error) {
            console.warn('Failed to fetch SEC ticker data:', error.message);
            console.log('Attempting to load from local ticker file...');
            
            try {
                const localResponse = await fetch(this.localTickerFile);
                if (!localResponse.ok) {
                    throw new Error(`HTTP ${localResponse.status}: ${localResponse.statusText}`);
                }
                const localData = await localResponse.json();
                this.tickerData = this.processSECData(localData);
                console.log(`Successfully loaded ${Object.keys(this.tickerData).length} tickers from local file`);
            } catch (localError) {
                console.warn('Failed to load local ticker file:', localError.message);
                console.log('Using minimal fallback ticker database');
                this.tickerData = this.getMinimalFallbackTickers();
            }
        }
        
        this.initialized = true;
    }

    /**
     * Process SEC data into a more usable format
     * @param {Object} data - Raw SEC API response
     * @returns {Object} Processed ticker data
     */
    processSECData(data) {
        const processed = {};
        
        if (data.data && typeof data.data === 'object') {
            for (const entry of Object.values(data.data)) {
                if (Array.isArray(entry) && entry.length >= 2) {
                    const [cik, name, ticker] = entry;
                    if (ticker && name) {
                        processed[ticker.toUpperCase()] = {
                            name: name.trim(),
                            ticker: ticker.toUpperCase(),
                            source: 'SEC'
                        };
                    }
                }
            }
        }
        
        return processed;
    }

    /**
     * Get minimal fallback ticker data for common stocks (last resort)
     * @returns {Object} Minimal fallback ticker database
     */
    getMinimalFallbackTickers() {
        return {
            'AAPL': { name: 'Apple Inc.', ticker: 'AAPL', source: 'fallback' },
            'MSFT': { name: 'Microsoft Corporation', ticker: 'MSFT', source: 'fallback' },
            'GOOGL': { name: 'Alphabet Inc.', ticker: 'GOOGL', source: 'fallback' },
            'GOOG': { name: 'Alphabet Inc.', ticker: 'GOOG', source: 'fallback' },
            'AMZN': { name: 'Amazon.com Inc.', ticker: 'AMZN', source: 'fallback' },
            'TSLA': { name: 'Tesla Inc.', ticker: 'TSLA', source: 'fallback' },
            'META': { name: 'Meta Platforms Inc.', ticker: 'META', source: 'fallback' },
            'NVDA': { name: 'NVIDIA Corporation', ticker: 'NVDA', source: 'fallback' },
            'JPM': { name: 'JPMorgan Chase & Co.', ticker: 'JPM', source: 'fallback' },
            'JNJ': { name: 'Johnson & Johnson', ticker: 'JNJ', source: 'fallback' },
            'V': { name: 'Visa Inc.', ticker: 'V', source: 'fallback' },
            'WMT': { name: 'Walmart Inc.', ticker: 'WMT', source: 'fallback' },
            'PG': { name: 'Procter & Gamble Company', ticker: 'PG', source: 'fallback' },
            'MA': { name: 'Mastercard Incorporated', ticker: 'MA', source: 'fallback' },
            'UNH': { name: 'UnitedHealth Group Incorporated', ticker: 'UNH', source: 'fallback' },
            'HD': { name: 'Home Depot Inc.', ticker: 'HD', source: 'fallback' },
            'BAC': { name: 'Bank of America Corporation', ticker: 'BAC', source: 'fallback' },
            'XOM': { name: 'Exxon Mobil Corporation', ticker: 'XOM', source: 'fallback' },
            'DIS': { name: 'Walt Disney Company', ticker: 'DIS', source: 'fallback' },
            'KO': { name: 'Coca-Cola Company', ticker: 'KO', source: 'fallback' },
            'BTC': { name: 'Bitcoin', ticker: 'BTC', source: 'fallback' },
            'ETH': { name: 'Ethereum', ticker: 'ETH', source: 'fallback' }
        };
    }

    /**
     * Lookup company name by ticker symbol
     * @param {string} ticker - Stock ticker symbol
     * @returns {Object|null} Company information or null if not found
     */
    async lookupTicker(ticker) {
        if (!this.initialized) {
            await this.initialize();
        }
        
        if (!ticker || typeof ticker !== 'string') {
            return null;
        }
        
        const upperTicker = ticker.toUpperCase();
        return this.tickerData[upperTicker] || null;
    }

    /**
     * Search for tickers matching a query
     * @param {string} query - Search query (partial ticker or company name)
     * @param {number} limit - Maximum number of results (default: 10)
     * @returns {Array} Array of matching ticker objects
     */
    async searchTickers(query, limit = 10) {
        if (!this.initialized) {
            await this.initialize();
        }
        
        if (!query || typeof query !== 'string' || query.length < 1) {
            return [];
        }
        
        const lowerQuery = query.toLowerCase();
        const results = [];
        
        for (const [ticker, info] of Object.entries(this.tickerData)) {
            if (results.length >= limit) break;
            
            if (ticker.toLowerCase().includes(lowerQuery) ||
                info.name.toLowerCase().includes(lowerQuery)) {
                results.push({
                    ...info,
                    relevance: this.calculateRelevance(query, ticker, info.name)
                });
            }
        }
        
        // Sort by relevance (higher is better)
        return results.sort((a, b) => b.relevance - a.relevance);
    }

    /**
     * Calculate relevance score for search results
     * @param {string} query - Search query
     * @param {string} ticker - Ticker symbol
     * @param {string} name - Company name
     * @returns {number} Relevance score
     */
    calculateRelevance(query, ticker, name) {
        const lowerQuery = query.toLowerCase();
        const lowerTicker = ticker.toLowerCase();
        const lowerName = name.toLowerCase();
        
        let score = 0;
        
        // Exact ticker match gets highest score
        if (lowerTicker === lowerQuery) score += 100;
        // Ticker starts with query gets high score
        else if (lowerTicker.startsWith(lowerQuery)) score += 80;
        // Ticker contains query gets medium score
        else if (lowerTicker.includes(lowerQuery)) score += 40;
        
        // Company name matches
        if (lowerName.includes(lowerQuery)) {
            if (lowerName.startsWith(lowerQuery)) score += 60;
            else score += 30;
        }
        
        return score;
    }
}

/**
 * Quote Service for fetching stock prices from various providers
 * Currently supports Stooq as the default JSON provider
 */
class QuoteService {
    constructor() {
        this.defaultProvider = 'stooq';
        this.providers = {
            stooq: {
                name: 'Stooq',
                endpoint: 'https://stooq.pl/q/l/?s={symbol}.US&f=sd2t2ohlcv&h&e=json',
                format: 'json'
            }
        };
    }

    /**
     * Fetch stock price for a given symbol
     * @param {string} symbol - Stock symbol (e.g., 'AAPL', 'MSFT')
     * @param {string} provider - Provider to use (defaults to 'stooq')
     * @returns {Promise<{price: number, source: string, timestamp: string} | null>}
     */
    async fetchPrice(symbol, provider = this.defaultProvider) {
        if (!symbol || typeof symbol !== 'string') {
            throw new Error('Invalid symbol provided');
        }

        const providerConfig = this.providers[provider];
        if (!providerConfig) {
            throw new Error(`Unknown provider: ${provider}`);
        }

        try {
            const url = providerConfig.endpoint.replace('{symbol}', symbol.toUpperCase());
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return this.parseStooqResponse(data, symbol);
        } catch (error) {
            console.warn(`Failed to fetch price for ${symbol} from ${provider}:`, error);
            return null;
        }
    }

    /**
     * Parse Stooq API response
     * @param {Object} data - API response data
     * @param {string} symbol - Original symbol requested
     * @returns {Object|null} Parsed price data
     */
    parseStooqResponse(data, symbol) {
        if (!data || !data.symbols || !Array.isArray(data.symbols) || data.symbols.length === 0) {
            return null;
        }

        const symbolData = data.symbols[0];
        if (!symbolData || typeof symbolData.c !== 'number') {
            return null;
        }

        return {
            price: symbolData.c, // Close price
            source: 'Stooq',
            timestamp: new Date().toISOString(),
            symbol: symbol.toUpperCase()
        };
    }
}

/**
 * Prefilled Price Service for loading locally stored stock prices
 * This service loads prices from GitHub Actions updated data
 */
class PrefilledPriceService {
    constructor() {
        this.priceData = null;
        this.initialized = false;
    }

    /**
     * Initialize the service by loading price data
     */
    async initialize() {
        if (this.initialized) return;
        
        try {
            console.log('Loading prefilled stock prices...');
            const response = await fetch('./stock-prices.json');
            
            if (response.ok) {
                this.priceData = await response.json();
                console.log(`Loaded ${this.priceData.totalSymbols} prefilled stock prices, last updated: ${this.priceData.lastUpdated}`);
            } else {
                console.warn('Failed to load prefilled prices:', response.status);
                this.priceData = { prices: {} };
            }
        } catch (error) {
            console.warn('Error loading prefilled prices:', error.message);
            this.priceData = { prices: {} };
        }
        
        this.initialized = true;
    }

    /**
     * Get price for a symbol
     * @param {string} symbol - Stock symbol
     * @returns {Object|null} Price data or null if not found
     */
    getPrice(symbol) {
        if (!this.initialized || !this.priceData) {
            return null;
        }
        
        const upperSymbol = symbol.toUpperCase();
        return this.priceData.prices[upperSymbol] || null;
    }

    /**
     * Check if price data is available for a symbol
     * @param {string} symbol - Stock symbol
     * @returns {boolean} True if price is available
     */
    hasPrice(symbol) {
        if (!this.initialized || !this.priceData) {
            return false;
        }
        
        const upperSymbol = symbol.toUpperCase();
        return upperSymbol in this.priceData.prices;
    }

    /**
     * Get metadata about the price data
     * @returns {Object} Metadata
     */
    getMetadata() {
        if (!this.initialized || !this.priceData) {
            return { lastUpdated: null, totalSymbols: 0 };
        }
        
        return {
            lastUpdated: this.priceData.lastUpdated,
            totalSymbols: this.priceData.totalSymbols || 0,
            updateSource: this.priceData.updateSource || 'Unknown'
        };
    }
}

class InvestmentPortfolio {
    constructor() {
        this.assets = this.loadAssets();
        this.transactions = this.loadTransactions();
        this.settings = this.loadSettings();
        this.balance = this.loadBalance();
        this.isScreenshotMode = false;
        this.currentTheme = this.settings.theme || 'default';
        this.holdingsSearchFilter = '';
        
        // Initialize quote service for automatic price fetching
        this.quoteService = new QuoteService();
        
        // Initialize prefilled price service for faster price loading
        this.prefilledPriceService = new PrefilledPriceService();
        
        // Initialize ticker service for company name lookup
        this.tickerService = new TickerService();
        
        this.initializeCurrencies();
        this.initializeBalance();
        this.initializeTheme();
        this.initializeApp();
        this.bindEvents();
        this.updatePortfolio();
        
        // Initialize prefilled prices asynchronously
        this.prefilledPriceService.initialize();
    }

    // Initialize currencies and settings
    initializeCurrencies() {
        this.currencies = {
            USD: { symbol: '$', name: 'US Dollar', rate: 1.0 },
            EUR: { symbol: '€', name: 'Euro', rate: 0.85 },
            GBP: { symbol: '£', name: 'British Pound', rate: 0.73 },
            JPY: { symbol: '¥', name: 'Japanese Yen', rate: 110.0 },
            CAD: { symbol: 'C$', name: 'Canadian Dollar', rate: 1.25 },
            AUD: { symbol: 'A$', name: 'Australian Dollar', rate: 1.35 }
        };
        
        // Set default currency if not set
        if (!this.settings.currency) {
            this.settings.currency = this.detectLocaleCurrency();
            this.saveSettings();
        }
        
        // Set default showProfit if not set (backward compatibility)
        if (this.settings.showProfit === undefined) {
            this.settings.showProfit = true;
            this.saveSettings();
        }
        
        // Set default institutional account setting
        if (this.settings.institutionalAccount === undefined) {
            this.settings.institutionalAccount = false;
            this.saveSettings();
        }
        
        // Set default dark pool access setting
        if (this.settings.darkPoolAccess === undefined) {
            this.settings.darkPoolAccess = false;
            this.saveSettings();
        }
        
        // Update currency selector
        const selector = document.getElementById('currency-selector');
        if (selector) {
            selector.value = this.settings.currency;
        }
        
        // Update profit toggle checkbox
        const profitToggle = document.getElementById('show-profit-toggle');
        if (profitToggle) {
            profitToggle.checked = this.settings.showProfit;
        }
        
        // Update volatility toggle checkbox
        const volatilityToggle = document.getElementById('enable-volatility-toggle');
        if (volatilityToggle) {
            volatilityToggle.checked = this.settings.enablePriceVolatility;
        }
        
        // Update institutional account toggle checkbox
        const institutionalToggle = document.getElementById('institutional-account-toggle');
        if (institutionalToggle) {
            institutionalToggle.checked = this.settings.institutionalAccount;
        }
        
        // Update dark pool access toggle checkbox
        const darkPoolToggle = document.getElementById('dark-pool-toggle');
        if (darkPoolToggle) {
            darkPoolToggle.checked = this.settings.darkPoolAccess;
        }
        
        // Update dark pool section visibility
        this.updateDarkPoolVisibility();
        
        // Update form labels
        this.updateFormLabels();
    }

    // Detect currency based on browser locale
    detectLocaleCurrency() {
        try {
            const locale = navigator.language || navigator.languages[0] || 'en-US';
            
            // Map common locales to currencies
            const localeToCurrency = {
                'en-US': 'USD', 'en': 'USD',
                'en-GB': 'GBP', 'en-UK': 'GBP',
                'en-CA': 'CAD',
                'en-AU': 'AUD', 'en-NZ': 'AUD',
                'de': 'EUR', 'de-DE': 'EUR', 'de-AT': 'EUR',
                'fr': 'EUR', 'fr-FR': 'EUR', 'fr-BE': 'EUR',
                'it': 'EUR', 'it-IT': 'EUR',
                'es': 'EUR', 'es-ES': 'EUR',
                'nl': 'EUR', 'nl-NL': 'EUR',
                'pt': 'EUR', 'pt-PT': 'EUR',
                'ja': 'JPY', 'ja-JP': 'JPY'
            };
            
            // Try exact match first
            if (localeToCurrency[locale]) {
                return localeToCurrency[locale];
            }
            
            // Try language code match
            const languageCode = locale.split('-')[0];
            if (localeToCurrency[languageCode]) {
                return localeToCurrency[languageCode];
            }
            
            // Try using Intl.NumberFormat to detect currency for the locale
            try {
                const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' });
                const options = formatter.resolvedOptions();
                
                // Check if the locale suggests a specific region
                if (locale.includes('-GB') || locale.includes('-UK')) return 'GBP';
                if (locale.includes('-CA')) return 'CAD';
                if (locale.includes('-AU') || locale.includes('-NZ')) return 'AUD';
                if (locale.includes('-JP')) return 'JPY';
                if (locale.includes('-DE') || locale.includes('-FR') || locale.includes('-IT') || 
                    locale.includes('-ES') || locale.includes('-NL') || locale.includes('-AT') ||
                    locale.includes('-BE') || locale.includes('-PT')) return 'EUR';
            } catch (e) {
                // Ignore errors in Intl.NumberFormat
            }
            
        } catch (error) {
            console.warn('Error detecting locale currency:', error);
        }
        
        // Default fallback
        return 'USD';
    }

    // Update form labels with current currency
    updateFormLabels() {
        const currencySymbol = this.getCurrentCurrencySymbol();
        
        const assetPriceLabel = document.getElementById('asset-price-label');
        if (assetPriceLabel) {
            assetPriceLabel.textContent = `Current Price (${currencySymbol}):`;
        }
        
        const transactionPriceLabel = document.getElementById('transaction-price-label');
        if (transactionPriceLabel) {
            transactionPriceLabel.textContent = `Price per unit (${currencySymbol}):`;
        }
    }

    // Initialize theme from settings
    initializeTheme() {
        // Define themes with their broker names
        this.themes = {
            default: { name: 'Default', brokerName: 'Investment Portfolio' },
            mobile: { name: 'Mobile', brokerName: 'MobileTrade Pro' },
            broker: { name: 'Broker', brokerName: 'GreenField Capital' },
            tradepro: { name: 'TradePro', brokerName: 'TradePro Securities' },
            wealthmax: { name: 'WealthMax', brokerName: 'WealthMax Advisors' },
            marketedge: { name: 'MarketEdge', brokerName: 'MarketEdge Financial' },
            investcorp: { name: 'InvestCorp', brokerName: 'InvestCorp Holdings' },
            financehub: { name: 'FinanceHub', brokerName: 'FinanceHub Trading' }
        };
        
        const themeKeys = Object.keys(this.themes);
        
        // Ensure the current theme is valid
        if (!themeKeys.includes(this.currentTheme)) {
            this.currentTheme = 'default';
        }
        
        // Apply the saved theme
        themeKeys.forEach(theme => {
            document.body.classList.remove(`theme-${theme}`);
        });
        
        if (this.currentTheme !== 'default') {
            document.body.classList.add(`theme-${this.currentTheme}`);
        }
        
        // Update button text
        const themeButton = document.getElementById('theme-selector');
        if (themeButton) {
            themeButton.innerHTML = `<i class="fas fa-palette"></i> <span data-i18n="menu.theme">Theme:</span> ${this.themes[this.currentTheme].name}`;
            // Reapply translations to the button after updating innerHTML
            i18n.applyTranslations();
        }
        
        // Initialize broker name
        this.initializeBrokerName();
    }

    // Initialize the application
    initializeApp() {
        // Set default date for transaction form
        const now = new Date();
        const localDateTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
        document.getElementById('transaction-date').value = localDateTime;
        
        // Update institutional badge
        this.updateInstitutionalBadge();
        
        this.updateViews();
    }

    // Bind event listeners
    bindEvents() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.switchView(e.currentTarget.dataset.view);
            });
        });

        // Currency selector
        document.getElementById('currency-selector').addEventListener('change', (e) => {
            this.settings.currency = e.target.value;
            this.saveSettings();
            this.updateFormLabels();
            this.updatePortfolio();
        });

        // Show profit toggle
        document.getElementById('show-profit-toggle').addEventListener('change', (e) => {
            this.settings.showProfit = e.target.checked;
            this.saveSettings();
            this.updatePortfolio();
        });

        // Enable volatility toggle
        document.getElementById('enable-volatility-toggle').addEventListener('change', (e) => {
            this.settings.enablePriceVolatility = e.target.checked;
            this.saveSettings();
            this.updatePortfolio();
        });

        // Institutional account toggle
        document.getElementById('institutional-account-toggle').addEventListener('change', (e) => {
            this.settings.institutionalAccount = e.target.checked;
            this.saveSettings();
            this.updateDarkPoolVisibility();
            this.updateInstitutionalBadge();
            // If disabling institutional, also disable dark pool
            if (!e.target.checked) {
                this.settings.darkPoolAccess = false;
                const darkPoolToggle = document.getElementById('dark-pool-toggle');
                if (darkPoolToggle) {
                    darkPoolToggle.checked = false;
                }
            }
        });

        // Dark pool access toggle
        document.getElementById('dark-pool-toggle').addEventListener('change', (e) => {
            this.settings.darkPoolAccess = e.target.checked;
            this.saveSettings();
        });

        // Modal controls
        document.getElementById('add-asset-btn').addEventListener('click', () => {
            this.openModal('add-asset-modal');
            // Clear any previous price status when opening the modal
            this.clearPriceStatus();
            // Hide NASDAQ link when opening the modal
            this.updateAssetNasdaqLink('');
            // Clear purchase preview when opening the modal
            this.clearAssetPurchasePreview();
            // Update discount field visibility
            this.updateDiscountFieldVisibility();
        });

        document.getElementById('add-transaction-btn').addEventListener('click', () => {
            this.openModal('add-transaction-modal');
            this.populateAssetSelect();
            // Clear quantity field when opening the modal
            document.getElementById('transaction-quantity').value = '';
            // Update discount field visibility
            this.updateDiscountFieldVisibility();
        });

        // Form submissions
        document.getElementById('add-asset-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addAsset();
        });

        document.getElementById('add-transaction-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTransaction();
        });

        // Transaction asset selection change handler
        document.getElementById('transaction-asset').addEventListener('change', (e) => {
            this.updateTransactionNasdaqLink(e.target.value);
            this.updateTransactionQuantity();
            this.updateTransactionPreview();
        });

        // Transaction type change handler
        document.getElementById('transaction-type').addEventListener('change', (e) => {
            this.updateTransactionQuantity();
            this.updateTransactionPreview();
        });

        // Transaction input change handlers for preview
        document.getElementById('transaction-quantity').addEventListener('input', () => {
            this.updateTransactionPreview();
        });
        
        document.getElementById('transaction-price').addEventListener('input', () => {
            this.updateTransactionPreview();
        });
        
        document.getElementById('transaction-discount').addEventListener('input', () => {
            this.updateTransactionPreview();
        });

        // Asset input change handlers for purchase preview
        document.getElementById('asset-quantity').addEventListener('input', () => {
            this.updateAssetPurchasePreview();
        });
        
        document.getElementById('asset-price').addEventListener('input', () => {
            this.updateAssetPurchasePreview();
        });
        
        document.getElementById('asset-discount').addEventListener('input', () => {
            this.updateAssetPurchasePreview();
        });

        // Price fetching and ticker suggestions functionality
        const assetSymbolInput = document.getElementById('asset-symbol');
        const assetNameInput = document.getElementById('asset-name');
        const fetchPriceBtn = document.getElementById('fetch-price-btn');
        const tickerSuggestions = document.getElementById('ticker-suggestions');

        // Auto-fetch price and show ticker suggestions when symbol is entered (with debounce)
        let symbolInputTimeout;
        let suggestionTimeout;
        let selectedSuggestionIndex = -1;

        assetSymbolInput.addEventListener('input', (e) => {
            clearTimeout(symbolInputTimeout);
            clearTimeout(suggestionTimeout);
            const symbol = e.target.value.trim();
            
            // Update NASDAQ link for Add New Asset modal
            this.updateAssetNasdaqLink(symbol);
            
            if (symbol.length >= 1) {
                // Show ticker suggestions immediately
                suggestionTimeout = setTimeout(() => {
                    this.showTickerSuggestions(symbol);
                }, 200);
                
                // Fetch price after user stops typing
                symbolInputTimeout = setTimeout(() => {
                    this.fetchAndUpdatePrice(symbol.toUpperCase());
                }, 1000);
            } else {
                this.clearPriceStatus();
                this.hideTickerSuggestions();
            }
            
            selectedSuggestionIndex = -1;
        });

        // Handle keyboard navigation for ticker suggestions
        assetSymbolInput.addEventListener('keydown', (e) => {
            const suggestions = tickerSuggestions.querySelectorAll('.ticker-suggestion');
            if (suggestions.length === 0) return;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    selectedSuggestionIndex = Math.min(selectedSuggestionIndex + 1, suggestions.length - 1);
                    this.updateSuggestionSelection(suggestions, selectedSuggestionIndex);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    selectedSuggestionIndex = Math.max(selectedSuggestionIndex - 1, -1);
                    this.updateSuggestionSelection(suggestions, selectedSuggestionIndex);
                    break;
                case 'Enter':
                    if (selectedSuggestionIndex >= 0) {
                        e.preventDefault();
                        this.selectTickerSuggestion(suggestions[selectedSuggestionIndex]);
                    }
                    break;
                case 'Escape':
                    this.hideTickerSuggestions();
                    selectedSuggestionIndex = -1;
                    break;
            }
        });

        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.symbol-input-container')) {
                this.hideTickerSuggestions();
            }
        });

        // Manual price fetch button
        fetchPriceBtn.addEventListener('click', () => {
            const symbol = assetSymbolInput.value.trim().toUpperCase();
            if (symbol) {
                this.fetchAndUpdatePrice(symbol);
            }
        });

        // Close modals
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modalId = e.target.closest('.modal').id;
                this.closeModal(modalId);
                // Clear price status when closing add asset modal
                if (modalId === 'add-asset-modal') {
                    this.clearPriceStatus();
                    // Hide NASDAQ link when closing the modal
                    this.updateAssetNasdaqLink('');
                    // Clear purchase preview when closing the modal
                    this.clearAssetPurchasePreview();
                }
            });
        });

        // Screenshot controls
        document.getElementById('screenshot-mode-btn').addEventListener('click', () => {
            this.toggleScreenshotMode();
        });

        document.getElementById('generate-screenshot').addEventListener('click', () => {
            this.generateScreenshot();
        });

        // Print statement button
        document.getElementById('print-statement').addEventListener('click', () => {
            this.generatePrintStatement();
        });

        // Copy statement button
        document.getElementById('copy-statement').addEventListener('click', () => {
            this.copyStatementToClipboard();
        });

        // Theme selector
        document.getElementById('theme-selector').addEventListener('click', () => {
            this.cycleTheme();
        });

        // Broker name editor
        document.getElementById('edit-broker-name').addEventListener('click', () => {
            this.showBrokerNameEditor();
        });

        // Balance editor
        document.getElementById('edit-balance').addEventListener('click', () => {
            this.showBalanceEditor();
        });

        // Hamburger menu toggle
        const hamburgerMenuBtn = document.getElementById('hamburger-menu-btn');
        const hamburgerMenu = document.getElementById('hamburger-menu');
        
        hamburgerMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburgerMenu.classList.toggle('active');
        });

        // Close hamburger menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.hamburger-menu') && !e.target.closest('.hamburger-menu-btn')) {
                hamburgerMenu.classList.remove('active');
            }
        });

        // Close hamburger menu when clicking on menu items (except currency selector)
        hamburgerMenu.addEventListener('click', (e) => {
            if (e.target.closest('.menu-btn')) {
                hamburgerMenu.classList.remove('active');
            }
        });

        // Close modal on background click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });

        // ESC key handler for screenshot mode
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isScreenshotMode) {
                this.exitScreenshotMode();
            }
        });

        // Reset portfolio button
        document.getElementById('reset-portfolio-btn').addEventListener('click', () => {
            this.showResetConfirmation();
        });

        // Reset confirmation
        document.getElementById('confirm-reset-btn').addEventListener('click', () => {
            const resetBrokerTheme = document.getElementById('reset-broker-theme-checkbox').checked;
            this.resetPortfolio(resetBrokerTheme);
        });

        // Export data button
        document.getElementById('export-data-btn').addEventListener('click', () => {
            this.exportData();
        });

        // Import data button
        document.getElementById('import-data-btn').addEventListener('click', () => {
            this.showImportConfirmation();
        });

        // Import file selection
        document.getElementById('select-file-btn').addEventListener('click', () => {
            document.getElementById('import-file-input').click();
        });

        // Import file input change
        document.getElementById('import-file-input').addEventListener('change', (e) => {
            this.handleFileSelection(e);
        });

        // Import confirmation
        document.getElementById('confirm-import-btn').addEventListener('click', () => {
            this.importData();
        });

        // Holdings search functionality
        const holdingsSearchInput = document.getElementById('holdings-search');
        if (holdingsSearchInput) {
            holdingsSearchInput.addEventListener('input', (e) => {
                this.filterHoldings(e.target.value);
            });
        }
    }

    // Switch between views
    switchView(viewName) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-view="${viewName}"]`).classList.add('active');

        // Update views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        document.getElementById(`${viewName}-view`).classList.add('active');

        // Update analytics if switching to analytics
        if (viewName === 'analytics') {
            this.updateAnalytics();
        }
    }

    // Asset Management
    addAsset() {
        // Prevent double submission by disabling the submit button
        const submitBtn = document.getElementById('add-asset-submit-btn');
        submitBtn.disabled = true;

        const symbol = document.getElementById('asset-symbol').value.toUpperCase();
        const name = document.getElementById('asset-name').value;
        const quantity = parseFloat(document.getElementById('asset-quantity').value);
        const priceInput = document.getElementById('asset-price');
        const inputPrice = parseFloat(priceInput.value);

        // Validate numeric inputs
        if (isNaN(quantity) || quantity <= 0) {
            alert('Please enter a valid quantity greater than 0');
            submitBtn.disabled = false;
            return;
        }

        if (isNaN(inputPrice) || inputPrice <= 0) {
            alert('Please enter a valid price greater than 0');
            submitBtn.disabled = false;
            return;
        }

        if (this.assets.find(asset => asset.symbol === symbol)) {
            alert('Asset already exists in portfolio');
            submitBtn.disabled = false; // Re-enable button on error
            return;
        }

        // Convert price to USD for storage
        let priceInUSD;
        if (priceInput.dataset.usdPrice) {
            // If we have the original USD price from API, use it
            priceInUSD = parseFloat(priceInput.dataset.usdPrice);
        } else {
            // Convert the input price from current currency to USD
            const currency = this.currencies[this.settings.currency];
            priceInUSD = inputPrice / currency.rate;
        }

        // Get discount if dark pool access is enabled
        const discountInput = document.getElementById('asset-discount');
        const discount = (discountInput && discountInput.value) ? parseFloat(discountInput.value) : 0;
        
        // Apply discount to the price (for buying)
        const discountedPrice = priceInUSD * (1 - discount / 100);

        // Calculate total cost in USD for balance check (using discounted price)
        const totalCostUSD = quantity * discountedPrice;

        // Check if there's enough balance for the initial purchase
        if (this.balance < totalCostUSD) {
            alert('Insufficient balance for this purchase!');
            submitBtn.disabled = false; // Re-enable button on error
            return;
        }

        // Generate realistic initial price variation to simulate purchase at different time
        const { initialPrice: adjustedInitialPrice, currentPrice: marketCurrentPrice } = 
            this.generateRealisticPriceVariation(priceInUSD, symbol);

        const asset = {
            id: this.generateId(),
            symbol,
            name,
            quantity,
            currentPrice: marketCurrentPrice,    // Store in USD
            initialPrice: adjustedInitialPrice,  // Store in USD  
            lastPriceUpdate: Date.now()         // Track when price was last updated
        };

        // Deduct balance for the initial purchase (use discounted price)
        this.balance -= totalCostUSD;
        this.saveBalance();

        this.assets.push(asset);
        this.saveAssets();
        this.updatePortfolio();
        this.closeModal('add-asset-modal');
        document.getElementById('add-asset-form').reset();
        
        // Clear price status when form is reset
        this.clearPriceStatus();
        // Hide NASDAQ link when form is reset
        this.updateAssetNasdaqLink('');
        // Clear purchase preview when form is reset
        this.clearAssetPurchasePreview();

        // Add initial buy transaction (with discount if applicable)
        const transaction = {
            id: this.generateId(),
            assetId: asset.id,
            type: 'buy',
            quantity,
            price: discountedPrice,        // Use the discounted price for transaction record
            discount: discount > 0 ? discount : undefined,  // Store discount percentage if applicable
            date: new Date().toISOString(),
            total: totalCostUSD      // Use the calculated total cost in USD for transaction record
        };

        this.transactions.push(transaction);
        this.saveTransactions();
        
        // Update portfolio again to show the transaction
        this.updatePortfolio();
        
        // Re-enable button after successful submission
        submitBtn.disabled = false;
    }

    /**
     * Fetch price for a symbol and update the UI
     * @param {string} symbol - Stock symbol to fetch price for
     */
    async fetchAndUpdatePrice(symbol) {
        if (!symbol || symbol.length < 1) {
            this.clearPriceStatus();
            return;
        }

        const priceInput = document.getElementById('asset-price');
        const priceStatus = document.getElementById('price-status');
        const priceStatusText = document.getElementById('price-status-text');

        // Show loading state
        this.showPriceStatus('loading', `Looking up price for ${symbol}...`);

        try {
            let priceData = null;
            let source = 'API';
            
            // First, try to get price from prefilled data
            if (this.prefilledPriceService.initialized) {
                priceData = this.prefilledPriceService.getPrice(symbol);
                if (priceData) {
                    source = 'Cached';
                    console.log(`Using prefilled price for ${symbol}: $${priceData.price}`);
                }
            }
            
            // If no prefilled price found, fetch from API
            if (!priceData) {
                this.showPriceStatus('loading', `Fetching live price for ${symbol}...`);
                priceData = await this.quoteService.fetchPrice(symbol);
                source = 'Live API';
            }
            
            if (priceData && priceData.price) {
                // Price from API is in USD, convert to current currency for display
                const currency = this.currencies[this.settings.currency];
                const convertedPrice = priceData.price * currency.rate;
                const currencySymbol = this.getCurrentCurrencySymbol();
                
                // Update price input with converted value
                priceInput.value = convertedPrice.toFixed(2);
                
                // Store the original USD price for later conversion back
                priceInput.dataset.usdPrice = priceData.price.toFixed(2);
                
                // Show success status with appropriate source indication
                const sourceText = source === 'Cached' ? 'Pre-loaded price' : `Price from ${priceData.source}`;
                const ageText = source === 'Cached' && priceData.timestamp ? 
                    ` (Updated: ${new Date(priceData.timestamp).toLocaleDateString()})` : '';
                
                this.showPriceStatus('success', 
                    `${sourceText}: ${currencySymbol}${convertedPrice.toFixed(2)} (Auto-filled, converted from $${priceData.price.toFixed(2)})${ageText}`);
                
                // Mark the input as auto-filled
                priceInput.dataset.autoFilled = 'true';
                priceInput.style.backgroundColor = source === 'Cached' ? '#f0f9ff' : '#f0fff4'; // Light blue for cached, light green for live
            } else {
                this.showPriceStatus('error', 
                    `Unable to fetch price for ${symbol}. Please enter manually.`);
            }
        } catch (error) {
            console.error('Price fetch error:', error);
            this.showPriceStatus('error', 
                `Failed to fetch price for ${symbol}: ${error.message}`);
        }
    }

    /**
     * Show price status with specified type and message
     * @param {string} type - Status type: 'loading', 'success', 'error'
     * @param {string} message - Status message to display
     */
    showPriceStatus(type, message) {
        const priceStatus = document.getElementById('price-status');
        const priceStatusText = document.getElementById('price-status-text');
        
        if (priceStatus && priceStatusText) {
            priceStatus.className = `price-status ${type}`;
            priceStatusText.textContent = message;
        }
    }

    /**
     * Clear price status indicator
     */
    clearPriceStatus() {
        const priceStatus = document.getElementById('price-status');
        const priceInput = document.getElementById('asset-price');
        
        if (priceStatus) {
            priceStatus.className = 'price-status hidden';
        }
        
        if (priceInput) {
            priceInput.dataset.autoFilled = 'false';
            priceInput.style.backgroundColor = '';
        }
    }

    /**
     * Show ticker suggestions based on user input
     * @param {string} query - Search query
     */
    async showTickerSuggestions(query) {
        const tickerSuggestions = document.getElementById('ticker-suggestions');
        
        if (!query || query.length < 1) {
            this.hideTickerSuggestions();
            return;
        }

        try {
            const suggestions = await this.tickerService.searchTickers(query, 8);
            
            if (suggestions.length === 0) {
                this.hideTickerSuggestions();
                return;
            }

            tickerSuggestions.innerHTML = '';
            
            suggestions.forEach((suggestion, index) => {
                const div = document.createElement('div');
                div.className = 'ticker-suggestion';
                div.innerHTML = `
                    <div class="ticker-suggestion-main">
                        <div class="ticker-suggestion-symbol">${suggestion.ticker}</div>
                        <div class="ticker-suggestion-name">${suggestion.name}</div>
                    </div>
                    <div class="ticker-suggestion-source">${suggestion.source}</div>
                `;
                
                div.addEventListener('click', () => {
                    this.selectTickerSuggestion(div, suggestion);
                });
                
                tickerSuggestions.appendChild(div);
            });
            
            tickerSuggestions.classList.remove('hidden');
        } catch (error) {
            console.warn('Failed to show ticker suggestions:', error);
            this.hideTickerSuggestions();
        }
    }

    /**
     * Hide ticker suggestions dropdown
     */
    hideTickerSuggestions() {
        const tickerSuggestions = document.getElementById('ticker-suggestions');
        if (tickerSuggestions) {
            tickerSuggestions.classList.add('hidden');
            tickerSuggestions.innerHTML = '';
        }
    }

    /**
     * Select a ticker suggestion and populate the form
     * @param {HTMLElement} suggestionElement - The clicked suggestion element
     * @param {Object} suggestion - The suggestion data (optional, will be extracted if not provided)
     */
    selectTickerSuggestion(suggestionElement, suggestion = null) {
        const assetSymbolInput = document.getElementById('asset-symbol');
        const assetNameInput = document.getElementById('asset-name');
        
        if (!suggestion) {
            // Extract data from the element if suggestion object not provided
            const symbolEl = suggestionElement.querySelector('.ticker-suggestion-symbol');
            const nameEl = suggestionElement.querySelector('.ticker-suggestion-name');
            
            if (symbolEl && nameEl) {
                suggestion = {
                    ticker: symbolEl.textContent,
                    name: nameEl.textContent
                };
            }
        }
        
        if (suggestion) {
            assetSymbolInput.value = suggestion.ticker;
            assetNameInput.value = suggestion.name;
            
            // Update NASDAQ link when ticker is selected
            this.updateAssetNasdaqLink(suggestion.ticker);
            
            // Trigger price fetch for the selected ticker
            this.fetchAndUpdatePrice(suggestion.ticker);
        }
        
        this.hideTickerSuggestions();
    }

    /**
     * Update visual selection state of suggestions
     * @param {NodeList} suggestions - List of suggestion elements
     * @param {number} selectedIndex - Index of selected suggestion (-1 for none)
     */
    updateSuggestionSelection(suggestions, selectedIndex) {
        suggestions.forEach((suggestion, index) => {
            if (index === selectedIndex) {
                suggestion.classList.add('selected');
            } else {
                suggestion.classList.remove('selected');
            }
        });
    }

    deleteAsset(assetId) {
        if (confirm('Are you sure you want to delete this asset and all related transactions?')) {
            this.assets = this.assets.filter(asset => asset.id !== assetId);
            this.transactions = this.transactions.filter(transaction => transaction.assetId !== assetId);
            this.saveAssets();
            this.saveTransactions();
            this.updatePortfolio();
        }
    }

    sellAllShares(assetId) {
        const asset = this.assets.find(a => a.id === assetId);
        if (!asset) {
            alert('Asset not found!');
            return;
        }

        if (asset.quantity <= 0) {
            alert('No shares to sell for this asset!');
            return;
        }

        const currencySymbol = this.getCurrentCurrencySymbol();
        const confirmation = confirm(`Are you sure you want to sell all ${this.formatQuantity(asset.quantity)} shares of ${asset.symbol} at current price ${currencySymbol}${this.formatCurrency(asset.currentPrice)}?`);
        if (!confirmation) {
            return;
        }

        // Calculate profit/loss
        const buyInPrice = asset.initialPrice;
        const profitLossPerShare = asset.currentPrice - buyInPrice;
        const totalProfitLoss = profitLossPerShare * asset.quantity;
        const profitLossPercent = buyInPrice > 0 ? (profitLossPerShare / buyInPrice) * 100 : 0;

        // Create sell transaction
        const transaction = {
            id: this.generateId(),
            assetId: asset.id,
            type: 'sell',
            quantity: asset.quantity,
            price: asset.currentPrice,
            date: new Date().toISOString(),
            total: asset.quantity * asset.currentPrice,
            profitLoss: totalProfitLoss,
            profitLossPercent: profitLossPercent
        };

        // Add transaction to history
        this.transactions.push(transaction);
        this.saveTransactions();

        // Update balance and asset quantity
        this.balance += transaction.total;
        asset.quantity = 0;
        
        this.saveAssets();
        this.saveBalance();
        this.updatePortfolio();

        // Show confirmation message with profit/loss info
        const profitLossText = totalProfitLoss >= 0 
            ? `+${currencySymbol}${this.formatCurrency(totalProfitLoss)} (+${profitLossPercent.toFixed(2)}%)`
            : `${currencySymbol}${this.formatCurrency(totalProfitLoss)} (${profitLossPercent.toFixed(2)}%)`;
        
        alert(`Successfully sold all shares of ${asset.symbol} for ${currencySymbol}${this.formatCurrency(transaction.total)}!\nProfit/Loss: ${profitLossText}`);
    }

    // Transaction Management
    addTransaction() {
        // Prevent double submission by disabling the submit button
        const submitBtn = document.getElementById('add-transaction-submit-btn');
        submitBtn.disabled = true;

        const assetId = document.getElementById('transaction-asset').value;
        const type = document.getElementById('transaction-type').value;
        const quantity = parseFloat(document.getElementById('transaction-quantity').value);
        const inputPrice = parseFloat(document.getElementById('transaction-price').value);
        const date = document.getElementById('transaction-date').value;

        // Validate numeric inputs
        if (isNaN(quantity) || quantity <= 0) {
            alert('Please enter a valid quantity greater than 0');
            submitBtn.disabled = false;
            return;
        }

        if (isNaN(inputPrice) || inputPrice <= 0) {
            alert('Please enter a valid price greater than 0');
            submitBtn.disabled = false;
            return;
        }

        // Convert price from current currency to USD for storage
        const currency = this.currencies[this.settings.currency];
        const priceInUSD = inputPrice / currency.rate;

        // Get discount if dark pool access is enabled
        const discountInput = document.getElementById('transaction-discount');
        const discount = (discountInput && discountInput.value) ? parseFloat(discountInput.value) : 0;
        
        // Apply discount to the price (only for buy transactions)
        const discountedPrice = type === 'buy' ? priceInUSD * (1 - discount / 100) : priceInUSD;

        const transaction = {
            id: this.generateId(),
            assetId,
            type,
            quantity,
            price: discountedPrice,  // Store discounted price in USD
            discount: discount > 0 && type === 'buy' ? discount : undefined,  // Store discount percentage if applicable
            date: new Date(date).toISOString(),
            total: quantity * discountedPrice  // Total in USD with discount
        };

        // Calculate profit/loss for sell transactions
        const asset = this.assets.find(a => a.id === assetId);
        if (type === 'sell' && asset) {
            const buyInPrice = asset.initialPrice;
            const profitLossPerShare = discountedPrice - buyInPrice;
            const totalProfitLoss = profitLossPerShare * quantity;
            
            transaction.profitLoss = totalProfitLoss;
            transaction.profitLossPercent = buyInPrice > 0 ? (profitLossPerShare / buyInPrice) * 100 : 0;
        }

        // Check if there's enough balance for buying
        if (type === 'buy' && this.balance < transaction.total) {
            alert('Insufficient balance for this purchase!');
            submitBtn.disabled = false; // Re-enable button on error
            return;
        }

        this.transactions.push(transaction);
        this.saveTransactions();

        // Update asset quantity
        if (asset) {
            if (type === 'buy') {
                asset.quantity += quantity;
                this.balance -= transaction.total; // Deduct from balance
            } else {
                asset.quantity -= quantity;
                this.balance += transaction.total; // Add to balance
            }
            asset.currentPrice = discountedPrice; // Update current price in USD
            this.saveAssets();
            this.saveBalance();
        }

        this.updatePortfolio();
        this.closeModal('add-transaction-modal');
        document.getElementById('add-transaction-form').reset();
        
        // Re-enable button after successful submission
        submitBtn.disabled = false;
    }

    deleteTransaction(transactionId) {
        if (confirm('Are you sure you want to delete this transaction?')) {
            const transaction = this.transactions.find(t => t.id === transactionId);
            if (transaction) {
                const asset = this.assets.find(a => a.id === transaction.assetId);
                if (asset) {
                    // Reverse the transaction effect
                    if (transaction.type === 'buy') {
                        asset.quantity -= transaction.quantity;
                        this.balance += transaction.total; // Restore balance
                    } else {
                        asset.quantity += transaction.quantity;
                        this.balance -= transaction.total; // Deduct from balance
                    }
                    this.saveAssets();
                    this.saveBalance();
                }
            }

            this.transactions = this.transactions.filter(t => t.id !== transactionId);
            this.saveTransactions();
            this.updatePortfolio();
        }
    }

    updateTransactionQuantity() {
        const assetId = document.getElementById('transaction-asset').value;
        const type = document.getElementById('transaction-type').value;
        const quantityInput = document.getElementById('transaction-quantity');

        // Only prefill for sell transactions when an asset is selected
        if (type === 'sell' && assetId) {
            const asset = this.assets.find(a => a.id === assetId);
            if (asset && asset.quantity > 0) {
                // Prefill with the owned quantity
                quantityInput.value = this.formatQuantity(asset.quantity);
            }
        } else if (type === 'buy' || !assetId) {
            // Clear the quantity field for buy transactions or when no asset is selected
            quantityInput.value = '';
        }
    }

    updateTransactionPreview() {
        const assetId = document.getElementById('transaction-asset').value;
        const type = document.getElementById('transaction-type').value;
        const quantity = parseFloat(document.getElementById('transaction-quantity').value);
        const inputPrice = parseFloat(document.getElementById('transaction-price').value);
        const discountInput = document.getElementById('transaction-discount');
        const discount = (discountInput && discountInput.value) ? parseFloat(discountInput.value) : 0;
        
        const previewContainer = document.getElementById('transaction-preview');
        const previewContent = document.getElementById('transaction-preview-content');
        
        // Hide preview if inputs are not valid
        if (!assetId || isNaN(quantity) || quantity <= 0 || isNaN(inputPrice) || inputPrice <= 0) {
            previewContainer.classList.add('hidden');
            return;
        }
        
        const currency = this.currencies[this.settings.currency];
        const currencySymbol = this.getCurrentCurrencySymbol();
        const priceInUSD = inputPrice / currency.rate;
        
        if (type === 'buy') {
            // Apply discount for buy transactions
            const discountedPriceInDisplayCurrency = inputPrice * (1 - discount / 100);
            const totalInDisplayCurrency = quantity * discountedPriceInDisplayCurrency;
            
            // Format numbers for display
            const formattedTotal = totalInDisplayCurrency.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            const formattedPrice = inputPrice.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            const formattedDiscountedPrice = discountedPriceInDisplayCurrency.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            
            // Build the formula display
            let formulaHtml;
            if (discount > 0) {
                formulaHtml = `(${this.formatQuantity(quantity)} × ${currencySymbol}${formattedDiscountedPrice} <span style="opacity: 0.7; text-decoration: line-through;">${currencySymbol}${formattedPrice}</span> with ${discount}% discount)`;
            } else {
                formulaHtml = `(${this.formatQuantity(quantity)} × ${currencySymbol}${formattedPrice})`;
            }
            
            previewContent.innerHTML = `
                <div class="transaction-preview-label">Total Purchase Price:</div>
                <div class="transaction-preview-total">
                    ${currencySymbol}${formattedTotal}
                    <span class="transaction-preview-formula">${formulaHtml}</span>
                </div>
            `;
            previewContainer.classList.remove('hidden');
        } else if (type === 'sell') {
            // Show profit/loss for sell transactions
            const asset = this.assets.find(a => a.id === assetId);
            if (asset) {
                const buyInPrice = asset.initialPrice;
                const profitLossPerShare = priceInUSD - buyInPrice;
                const totalProfitLossUSD = profitLossPerShare * quantity;
                const profitLossPercent = buyInPrice > 0 ? (profitLossPerShare / buyInPrice) * 100 : 0;
                
                const isProfit = totalProfitLossUSD >= 0;
                const profitClass = isProfit ? 'positive' : 'negative';
                const profitSign = isProfit ? '+' : '';
                
                previewContent.innerHTML = `
                    <div class="transaction-preview-label">Expected Profit/Loss:</div>
                    <div class="transaction-preview-profit ${profitClass}">
                        ${profitSign}${currencySymbol}${this.formatCurrency(Math.abs(totalProfitLossUSD))}
                        (${profitSign}${profitLossPercent.toFixed(2)}%)
                    </div>
                    <div class="transaction-preview-details">
                        Buy-in: ${currencySymbol}${this.formatCurrency(buyInPrice)} → 
                        Sell: ${currencySymbol}${inputPrice.toFixed(currency.symbol === '¥' ? 0 : 2)}
                    </div>
                `;
                previewContainer.classList.remove('hidden');
            } else {
                previewContainer.classList.add('hidden');
            }
        }
    }

    updateAssetPurchasePreview() {
        const quantity = parseFloat(document.getElementById('asset-quantity').value);
        const inputPrice = parseFloat(document.getElementById('asset-price').value);
        const discountInput = document.getElementById('asset-discount');
        const discount = (discountInput && discountInput.value) ? parseFloat(discountInput.value) : 0;
        
        const previewContainer = document.getElementById('asset-purchase-preview');
        const previewContent = document.getElementById('asset-purchase-preview-content');
        
        // Hide preview if inputs are not valid
        if (isNaN(quantity) || quantity <= 0 || isNaN(inputPrice) || inputPrice <= 0) {
            previewContainer.classList.add('hidden');
            return;
        }
        
        const currencySymbol = this.getCurrentCurrencySymbol();
        
        // Apply discount to the price
        const discountedPrice = inputPrice * (1 - discount / 100);
        const totalPurchasePrice = quantity * discountedPrice;
        
        // Format numbers directly since they're already in display currency
        const formattedTotal = totalPurchasePrice.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        const formattedPrice = inputPrice.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        const formattedDiscountedPrice = discountedPrice.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        
        // Build the formula display
        let formulaHtml;
        if (discount > 0) {
            formulaHtml = `(${this.formatQuantity(quantity)} × ${currencySymbol}${formattedDiscountedPrice} <span style="opacity: 0.7; text-decoration: line-through;">${currencySymbol}${formattedPrice}</span> with ${discount}% discount)`;
        } else {
            formulaHtml = `(${this.formatQuantity(quantity)} × ${currencySymbol}${formattedPrice})`;
        }
        
        previewContent.innerHTML = `
            <div class="transaction-preview-label">Total Purchase Price:</div>
            <div class="transaction-preview-total">
                ${currencySymbol}${formattedTotal}
                <span class="transaction-preview-formula">${formulaHtml}</span>
            </div>
        `;
        previewContainer.classList.remove('hidden');
    }

    clearAssetPurchasePreview() {
        const previewContainer = document.getElementById('asset-purchase-preview');
        if (previewContainer) {
            previewContainer.classList.add('hidden');
        }
    }

    // Portfolio Updates
    updatePortfolio() {
        // Simulate market updates to keep portfolio looking realistic
        this.simulateMarketUpdates();
        
        this.updatePortfolioSummary();
        this.updateHoldingsList();
        this.updateTransactionsList();
    }

    updatePortfolioSummary() {
        const totalValue = this.calculateTotalValue();
        const totalInvested = this.calculateTotalInvested();
        const totalChange = totalValue - totalInvested;
        const changePercent = totalInvested > 0 ? ((totalChange / totalInvested) * 100) : 0;
        const currencySymbol = this.getCurrentCurrencySymbol();

        // Update currency symbol in display
        const currencyElements = document.querySelectorAll('.currency');
        currencyElements.forEach(el => el.textContent = currencySymbol);
        
        document.getElementById('total-value').textContent = this.formatCurrency(totalValue);
        
        // Show or hide profit/loss based on setting
        // Only show profit/loss if BOTH showProfit is enabled AND price volatility is enabled
        const changeElement = document.querySelector('.change-display');
        if (this.settings.showProfit && this.settings.enablePriceVolatility) {
            document.getElementById('total-change').textContent = 
                `${totalChange >= 0 ? '+' : ''}${currencySymbol}${this.formatCurrency(totalChange)}`;
            document.getElementById('total-change-percent').textContent = 
                `(${totalChange >= 0 ? '+' : ''}${changePercent.toFixed(2)}%)`;
            changeElement.style.display = '';
            changeElement.classList.toggle('negative', totalChange < 0);
        } else {
            changeElement.style.display = 'none';
        }

        // Update balance display
        const balanceElement = document.getElementById('balance-value');
        if (balanceElement) {
            balanceElement.textContent = this.formatCurrency(this.balance);
        }
    }

    updateHoldingsList() {
        const holdingsList = document.getElementById('holdings-list');
        
        // Filter out assets with zero quantity for display
        let activeAssets = this.assets.filter(asset => asset.quantity > 0);
        
        // Apply search filter if active
        if (this.holdingsSearchFilter) {
            const searchLower = this.holdingsSearchFilter.toLowerCase();
            activeAssets = activeAssets.filter(asset => 
                asset.symbol.toLowerCase().includes(searchLower) || 
                asset.name.toLowerCase().includes(searchLower)
            );
        }
        
        if (activeAssets.length === 0) {
            const emptyMessage = this.holdingsSearchFilter ? 
                `<div class="empty-state">
                    <i class="fas fa-search"></i>
                    <h3>No Holdings Found</h3>
                    <p>No holdings match your search "${this.holdingsSearchFilter}"</p>
                </div>` :
                `<div class="empty-state">
                    <i class="fas fa-chart-pie"></i>
                    <h3>No Holdings Yet</h3>
                    <p>Add your first asset to get started</p>
                </div>`;
            holdingsList.innerHTML = emptyMessage;
            return;
        }

        holdingsList.innerHTML = activeAssets.map(asset => {
            const value = asset.quantity * asset.currentPrice;
            const change = value - (asset.quantity * asset.initialPrice);
            const buyInValue = asset.quantity * asset.initialPrice;
            const changePercent = buyInValue > 0 ? ((change / buyInValue) * 100) : 0;
            const currencySymbol = this.getCurrentCurrencySymbol();

            // Conditionally render profit/loss display
            // Only show profit/loss if BOTH showProfit is enabled AND price volatility is enabled
            const profitDisplay = (this.settings.showProfit && this.settings.enablePriceVolatility) ? 
                `<div class="holding-change ${change < 0 ? 'negative' : ''}">
                    ${change >= 0 ? '+' : ''}${currencySymbol}${this.formatCurrency(change)} (${changePercent.toFixed(2)}%)
                </div>` : '';

            return `
                <div class="holding-item">
                    <div class="holding-info">
                        <div class="holding-symbol">${asset.symbol}</div>
                        <div class="holding-name">${asset.name}</div>
                        <div class="holding-quantity">${this.formatQuantity(asset.quantity)} shares @ ${currencySymbol}${this.formatCurrency(asset.currentPrice)}</div>
                    </div>
                    <div class="holding-values">
                        <div class="holding-value">${currencySymbol}${this.formatCurrency(value)}</div>
                        ${profitDisplay}
                    </div>
                    <div class="holding-actions">
                        <a href="${this.getNasdaqUrl(asset.symbol)}" target="_blank" class="btn btn-secondary btn-small" title="Check price on NASDAQ">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                        <button class="btn btn-warning btn-small" onclick="app.sellAllShares('${asset.id}')" title="Sell all shares">
                            <i class="fas fa-coins"></i>
                        </button>
                        <button class="btn btn-danger btn-small edit-only" onclick="app.deleteAsset('${asset.id}')" title="Delete asset">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    filterHoldings(searchTerm) {
        this.holdingsSearchFilter = searchTerm.trim();
        this.updateHoldingsList();
    }

    updateTransactionsList() {
        const transactionsList = document.getElementById('transactions-list');
        
        if (this.transactions.length === 0) {
            transactionsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-exchange-alt"></i>
                    <h3>No Transactions Yet</h3>
                    <p>Add your first transaction to see history</p>
                </div>
            `;
            return;
        }

        const sortedTransactions = [...this.transactions].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            // Sort by date descending (newest first)
            if (dateB - dateA !== 0) {
                return dateB - dateA;
            }
            // If dates are equal, sort by ID descending to maintain stable order
            // IDs are generated with Date.now() + random, so newer IDs are lexicographically greater
            return b.id.localeCompare(a.id);
        });

        transactionsList.innerHTML = sortedTransactions.map(transaction => {
            const asset = this.assets.find(a => a.id === transaction.assetId);
            const assetSymbol = asset ? asset.symbol : 'Unknown';
            const currencySymbol = this.getCurrentCurrencySymbol();

            // Calculate profit/loss for sell transactions if not already stored
            let profitLossDisplay = '';
            // Show profit/loss for sell transactions if showProfit is enabled
            // Transaction profit/loss is real (buy price vs sell price), not dependent on price volatility
            if (transaction.type === 'sell' && this.settings.showProfit) {
                let profitLoss = transaction.profitLoss;
                let profitLossPercent = transaction.profitLossPercent;
                
                // Calculate profit/loss if not stored (for backward compatibility)
                if (profitLoss === undefined && asset) {
                    const buyInPrice = asset.initialPrice;
                    const profitLossPerShare = transaction.price - buyInPrice;
                    profitLoss = profitLossPerShare * transaction.quantity;
                    profitLossPercent = buyInPrice > 0 ? (profitLossPerShare / buyInPrice) * 100 : 0;
                }
                
                if (profitLoss !== undefined) {
                    const profitLossClass = profitLoss >= 0 ? 'positive' : 'negative';
                    const profitLossSign = profitLoss >= 0 ? '+' : '';
                    profitLossDisplay = `
                        <div class="transaction-profit-loss ${profitLossClass}">
                            ${profitLossSign}${currencySymbol}${this.formatCurrency(profitLoss)} (${profitLossSign}${profitLossPercent.toFixed(2)}%)
                        </div>
                    `;
                }
            }

            // Calculate original price and discount display for dark pool transactions
            let priceDisplay;
            let darkPoolBadge = '';
            if (transaction.discount && transaction.discount > 0 && transaction.type === 'buy') {
                // Calculate original (undiscounted) price
                const originalPrice = transaction.price / (1 - transaction.discount / 100);
                priceDisplay = `${currencySymbol}${this.formatCurrency(originalPrice)}`;
                const discountDisplay = `<span class="transaction-discount" title="Dark Pool Discount">${transaction.discount.toFixed(2)}%</span>`;
                darkPoolBadge = `<span class="dark-pool-badge">Dark Pool</span>`;
                priceDisplay += ` ${discountDisplay}`;
            } else {
                priceDisplay = `${currencySymbol}${this.formatCurrency(transaction.price)}`;
            }

            return `
                <div class="transaction-item">
                    <div class="transaction-type ${transaction.type}">${transaction.type}</div>
                    <div class="transaction-details">
                        <div class="transaction-asset">${assetSymbol} ${darkPoolBadge}</div>
                        <div class="transaction-date">${this.formatDate(transaction.date)}</div>
                    </div>
                    <div class="transaction-quantity">${this.formatQuantity(transaction.quantity)} @ ${priceDisplay}</div>
                    <div class="transaction-value">
                        ${currencySymbol}${this.formatCurrency(transaction.total)}
                        ${profitLossDisplay}
                    </div>
                    <div class="transaction-actions edit-only">
                        <button class="btn btn-danger btn-small" onclick="app.deleteTransaction('${transaction.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Analytics
    updateAnalytics() {
        const totalInvested = this.calculateTotalInvested();
        const totalValue = this.calculateTotalValue();
        const totalReturn = totalValue - totalInvested;
        const bestPerformer = this.getBestPerformer();
        const currencySymbol = this.getCurrentCurrencySymbol();

        document.getElementById('total-invested').textContent = `${currencySymbol}${this.formatCurrency(totalInvested)}`;
        document.getElementById('total-return').textContent = `${currencySymbol}${this.formatCurrency(totalReturn)}`;
        document.getElementById('best-performer').textContent = bestPerformer || '-';
        document.getElementById('total-transactions').textContent = this.transactions.length;

        this.drawPerformanceChart();
    }

    drawPerformanceChart() {
        const canvas = document.getElementById('performance-chart');
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (this.transactions.length < 2) {
            ctx.fillStyle = '#64748b';
            ctx.font = '16px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Not enough data to display chart', canvas.width / 2, canvas.height / 2);
            return;
        }

        // Generate portfolio value over time
        const portfolioHistory = this.generatePortfolioHistory();
        
        if (portfolioHistory.length < 2) return;

        const maxValue = Math.max(...portfolioHistory.map(p => p.value));
        const minValue = Math.min(...portfolioHistory.map(p => p.value));
        const valueRange = maxValue - minValue || 1;

        // Draw chart
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 2;
        ctx.beginPath();

        portfolioHistory.forEach((point, index) => {
            const x = (index / (portfolioHistory.length - 1)) * (canvas.width - 40) + 20;
            const y = canvas.height - 20 - ((point.value - minValue) / valueRange) * (canvas.height - 40);
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // Draw data points
        ctx.fillStyle = '#2563eb';
        portfolioHistory.forEach((point, index) => {
            const x = (index / (portfolioHistory.length - 1)) * (canvas.width - 40) + 20;
            const y = canvas.height - 20 - ((point.value - minValue) / valueRange) * (canvas.height - 40);
            
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.fill();
        });
    }

    generatePortfolioHistory() {
        const history = [];
        const sortedTransactions = [...this.transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
        
        let portfolioState = {};
        
        sortedTransactions.forEach(transaction => {
            const asset = this.assets.find(a => a.id === transaction.assetId);
            if (!asset) return;
            
            if (!portfolioState[transaction.assetId]) {
                portfolioState[transaction.assetId] = { quantity: 0, price: transaction.price };
            }
            
            if (transaction.type === 'buy') {
                portfolioState[transaction.assetId].quantity += transaction.quantity;
            } else {
                portfolioState[transaction.assetId].quantity -= transaction.quantity;
            }
            
            portfolioState[transaction.assetId].price = transaction.price;
            
            const totalValue = Object.values(portfolioState).reduce((sum, holding) => {
                return sum + (holding.quantity * holding.price);
            }, 0);
            
            history.push({
                date: transaction.date,
                value: totalValue
            });
        });
        
        return history;
    }

    // Utility Functions
    calculateTotalValue() {
        return this.assets.reduce((total, asset) => total + (asset.quantity * asset.currentPrice), 0);
    }

    calculateTotalInvested() {
        return this.transactions
            .filter(t => t.type === 'buy')
            .reduce((total, transaction) => total + transaction.total, 0) -
            this.transactions
            .filter(t => t.type === 'sell')
            .reduce((total, transaction) => total + transaction.total, 0);
    }

    getBestPerformer() {
        if (this.assets.length === 0) return null;
        
        const bestAsset = this.assets.reduce((best, asset) => {
            const currentReturn = asset.initialPrice > 0 ? ((asset.currentPrice - asset.initialPrice) / asset.initialPrice) * 100 : 0;
            const bestReturn = best && best.initialPrice > 0 ? ((best.currentPrice - best.initialPrice) / best.initialPrice) * 100 : -Infinity;
            return currentReturn > bestReturn ? asset : best;
        }, null);
        
        return bestAsset ? bestAsset.symbol : null;
    }

    formatCurrency(amount) {
        const currency = this.currencies[this.settings.currency];
        const convertedAmount = amount * currency.rate;
        
        return new Intl.NumberFormat('en-US', {
            style: 'decimal',
            minimumFractionDigits: currency.symbol === '¥' ? 0 : 2,
            maximumFractionDigits: currency.symbol === '¥' ? 0 : 2
        }).format(Math.abs(convertedAmount));
    }

    formatQuantity(quantity) {
        // Format quantity to remove excess trailing zeroes
        // If it's a whole number, show without decimals
        // Otherwise, show up to 6 decimals but remove trailing zeroes
        const roundedQuantity = Math.round(quantity);
        if (roundedQuantity === quantity) {
            return roundedQuantity.toString();
        } else {
            // Use toFixed(6) then remove trailing zeros
            return parseFloat(quantity.toFixed(6)).toString();
        }
    }

    getCurrentCurrencySymbol() {
        return this.currencies[this.settings.currency].symbol;
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(2);
    }

    /**
     * Generate realistic price variation to simulate market volatility
     * @param {number} basePrice - The base price to vary from
     * @param {string} symbol - Asset symbol (not used for volatility determination)
     * @returns {object} Object with initialPrice and currentPrice
     */
    generateRealisticPriceVariation(basePrice, symbol) {
        // If volatility is disabled, return the same price for both initial and current
        if (!this.settings.enablePriceVolatility) {
            const roundedPrice = Math.round(basePrice * 100) / 100;
            return {
                initialPrice: roundedPrice,
                currentPrice: roundedPrice
            };
        }
        
        // Use uniform volatility for all assets regardless of type
        const maxVariation = 0.08; // Up to 8% variation for all assets
        
        // Generate random variations for initial and current price
        // Make it more likely to have modest gains to simulate a generally growing market
        const initialVariation = (Math.random() - 0.6) * maxVariation; // Slightly biased down
        const currentVariation = (Math.random() - 0.4) * maxVariation; // Slightly biased up
        
        // Calculate prices with some correlation between initial and current
        const initialPrice = basePrice * (1 + initialVariation);
        let currentPrice = basePrice * (1 + currentVariation);
        
        // Add some correlation: if initial was low, current tends to be higher (regression to mean)
        const correlation = -0.3 * initialVariation * maxVariation;
        currentPrice = currentPrice * (1 + correlation);
        
        // Ensure prices are positive and reasonable
        const finalInitialPrice = Math.max(initialPrice, basePrice * 0.5);
        const finalCurrentPrice = Math.max(currentPrice, basePrice * 0.5);
        
        return {
            initialPrice: Math.round(finalInitialPrice * 100) / 100,
            currentPrice: Math.round(finalCurrentPrice * 100) / 100
        };
    }


    /**
     * Simulate market price updates for existing assets
     * This creates a more realistic portfolio by updating prices over time
     */
    simulateMarketUpdates() {
        // Skip market updates if volatility is disabled
        if (!this.settings.enablePriceVolatility) {
            return;
        }
        
        const now = Date.now();
        const updateInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        
        this.assets.forEach(asset => {
            // Initialize lastPriceUpdate for existing assets
            if (!asset.lastPriceUpdate) {
                asset.lastPriceUpdate = now - Math.random() * 7 * 24 * 60 * 60 * 1000; // Random time in last week
            }
            
            // Update price if it's been more than 24 hours (in fake time, we'll make it more frequent)
            const timeSinceUpdate = now - asset.lastPriceUpdate;
            if (timeSinceUpdate > updateInterval / 24) { // Update more frequently for demo purposes
                this.updateAssetPrice(asset);
                asset.lastPriceUpdate = now;
            }
        });
        
        // Save updated assets
        this.saveAssets();
    }

    /**
     * Update price for a single asset with realistic market movement
     * @param {object} asset - Asset to update
     */
    updateAssetPrice(asset) {
        // Use uniform daily volatility for all assets regardless of type
        const dailyVolatility = 0.03; // Up to 3% daily change for all assets
        
        // Generate realistic price movement (slightly biased upward for long-term growth)
        const priceChange = (Math.random() - 0.45) * dailyVolatility; // Slightly biased positive
        const newPrice = asset.currentPrice * (1 + priceChange);
        
        // Ensure price doesn't go below 10% of initial price or above 500% of initial price
        const minPrice = asset.initialPrice * 0.1;
        const maxPrice = asset.initialPrice * 5.0;
        
        asset.currentPrice = Math.max(minPrice, Math.min(maxPrice, Math.round(newPrice * 100) / 100));
    }

    /**
     * Generate NASDAQ URL for a stock symbol
     * @param {string} symbol - Stock symbol
     * @returns {string} NASDAQ URL for the symbol
     */
    getNasdaqUrl(symbol) {
        return `https://www.nasdaq.com/market-activity/stocks/${symbol.toLowerCase()}`;
    }

    // Modal Management
    openModal(modalId) {
        document.getElementById(modalId).classList.add('active');
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    }

    showResetConfirmation() {
        this.openModal('reset-confirmation-modal');
    }

    resetPortfolio(resetBrokerTheme = false) {
        try {
            // Clear all portfolio data
            this.assets = [];
            this.transactions = [];
            
            // Reset balance to default (1000 EUR equivalent in USD)
            const eurToUsd = 1.0 / 0.85; // EUR rate is 0.85, so 1 EUR = 1.176 USD
            this.balance = 1000 * eurToUsd; // 1000 EUR in USD (~1176.47)
            
            // Clear localStorage
            localStorage.removeItem('fake-portfolio-assets');
            localStorage.removeItem('fake-portfolio-transactions');
            localStorage.removeItem('fake-portfolio-balance');
            
            if (resetBrokerTheme) {
                // Reset all custom broker names
                Object.keys(this.themes).forEach(theme => {
                    localStorage.removeItem(`fake-portfolio-broker-name-${theme}`);
                });
                
                // Reset settings (currency and theme)
                this.settings = { currency: 'USD', theme: 'default' };
                this.currentTheme = 'default';
                localStorage.removeItem('fake-portfolio-settings');
            }
            
            // Save the reset data
            this.saveAssets();
            this.saveTransactions();
            this.saveBalance();
            if (resetBrokerTheme) {
                this.saveSettings();
            }
            
            // Reinitialize the application
            if (resetBrokerTheme) {
                this.initializeTheme();
                this.initializeCurrencies();
            }
            this.updatePortfolio();
            
            // Close the modal
            this.closeModal('reset-confirmation-modal');
            
            // Uncheck the reset option for next time
            document.getElementById('reset-broker-theme-checkbox').checked = false;
            
            // Show success notification
            this.showNotification('Portfolio has been successfully reset!', 'success');
            
        } catch (error) {
            console.error('Error resetting portfolio:', error);
            this.showNotification('Error resetting portfolio. Please try again.', 'error');
        }
    }

    // Export all localStorage data
    exportData() {
        try {
            const exportData = {};
            const localStorageKeys = Object.keys(localStorage);
            
            // Export all keys that start with 'fake-portfolio-' for future-proofing
            localStorageKeys.forEach(key => {
                if (key.startsWith('fake-portfolio-')) {
                    exportData[key] = localStorage.getItem(key);
                }
            });
            
            // Create export metadata
            const exportObject = {
                exportedAt: new Date().toISOString(),
                version: '1.0',
                subdomain: window.location.hostname,
                data: exportData
            };
            
            // Create and download file
            const dataStr = JSON.stringify(exportObject, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            this.showNotification('Portfolio data exported successfully!', 'success');
            
        } catch (error) {
            console.error('Error exporting data:', error);
            this.showNotification('Error exporting data. Please try again.', 'error');
        }
    }

    // Show import confirmation modal
    showImportConfirmation() {
        document.getElementById('import-confirmation-modal').style.display = 'flex';
        // Reset file selection
        document.getElementById('import-file-input').value = '';
        document.getElementById('selected-file-name').textContent = '';
        document.getElementById('confirm-import-btn').disabled = true;
    }

    // Handle file selection for import
    handleFileSelection(event) {
        const file = event.target.files[0];
        const fileNameSpan = document.getElementById('selected-file-name');
        const confirmBtn = document.getElementById('confirm-import-btn');
        
        if (file) {
            if (file.type === 'application/json' || file.name.endsWith('.json')) {
                fileNameSpan.textContent = file.name;
                confirmBtn.disabled = false;
            } else {
                fileNameSpan.textContent = '';
                confirmBtn.disabled = true;
                this.showNotification('Please select a valid JSON file.', 'error');
            }
        } else {
            fileNameSpan.textContent = '';
            confirmBtn.disabled = true;
        }
    }

    // Import data from file
    importData() {
        const fileInput = document.getElementById('import-file-input');
        const file = fileInput.files[0];
        
        if (!file) {
            this.showNotification('Please select a file to import.', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importObject = JSON.parse(e.target.result);
                
                // Validate import data structure
                if (!importObject.data || typeof importObject.data !== 'object') {
                    throw new Error('Invalid import file format');
                }
                
                // Clear existing localStorage keys that start with 'fake-portfolio-'
                const existingKeys = Object.keys(localStorage);
                existingKeys.forEach(key => {
                    if (key.startsWith('fake-portfolio-')) {
                        localStorage.removeItem(key);
                    }
                });
                
                // Import all data
                Object.entries(importObject.data).forEach(([key, value]) => {
                    if (key.startsWith('fake-portfolio-')) {
                        localStorage.setItem(key, value);
                    }
                });
                
                // Close the modal
                this.closeModal('import-confirmation-modal');
                
                // Show notification and reload to apply changes
                this.showNotification('Data imported successfully! Reloading page...', 'success');
                
                // Reload the page after a short delay to apply all imported settings
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
                
            } catch (error) {
                console.error('Error importing data:', error);
                this.showNotification('Error importing data. Please check the file format.', 'error');
            }
        };
        
        reader.readAsText(file);
    }

    populateAssetSelect() {
        const select = document.getElementById('transaction-asset');
        select.innerHTML = '<option value="">Select an asset</option>';
        
        this.assets.forEach(asset => {
            const option = document.createElement('option');
            option.value = asset.id;
            option.textContent = `${asset.symbol} - ${asset.name}`;
            select.appendChild(option);
        });
        
        // Hide NASDAQ link initially
        this.updateTransactionNasdaqLink('');
    }

    updateTransactionNasdaqLink(assetId) {
        const nasdaqLink = document.getElementById('transaction-nasdaq-link');
        
        if (!assetId) {
            nasdaqLink.style.display = 'none';
            return;
        }
        
        const asset = this.assets.find(a => a.id === assetId);
        if (asset) {
            nasdaqLink.href = this.getNasdaqUrl(asset.symbol);
            nasdaqLink.style.display = 'inline-flex';
        } else {
            nasdaqLink.style.display = 'none';
        }
    }

    updateAssetNasdaqLink(symbol) {
        const nasdaqLink = document.getElementById('asset-nasdaq-link');
        
        if (!symbol || symbol.length < 1) {
            nasdaqLink.style.display = 'none';
            return;
        }
        
        nasdaqLink.href = this.getNasdaqUrl(symbol);
        nasdaqLink.style.display = 'inline-flex';
    }

    // Screenshot Mode
    enableScreenshotMode() {
        if (!this.isScreenshotMode) {
            this.isScreenshotMode = true;
            document.body.classList.add('screenshot-mode');
        }
    }

    disableScreenshotMode() {
        if (this.isScreenshotMode) {
            this.isScreenshotMode = false;
            document.body.classList.remove('screenshot-mode');
        }
    }

    toggleScreenshotMode() {
        this.isScreenshotMode = !this.isScreenshotMode;
        document.body.classList.toggle('screenshot-mode', this.isScreenshotMode);
        this.showScreenshotFeedback();
    }

    exitScreenshotMode() {
        if (this.isScreenshotMode) {
            this.disableScreenshotMode();
            this.showScreenshotFeedback();
        }
    }

    showScreenshotFeedback() {
        const feedbackText = this.isScreenshotMode ? 
            'Screenshot mode active - Press ESC to exit' : 
            'Screenshot mode disabled';
        this.showNotification(feedbackText, this.isScreenshotMode ? 'info' : 'success');
    }

    async generateScreenshot() {
        // Check if Screen Capture API is supported
        if (!navigator.mediaDevices?.getDisplayMedia) {
            this.showNotification('Screen capture not supported in this browser. Using fallback method.', 'warning');
            this.generateScreenshotFallback();
            return;
        }

        // Store current screenshot mode state
        const wasInScreenshotMode = this.isScreenshotMode;

        try {
            // Enable screenshot mode to hide UI elements
            this.enableScreenshotMode();
            
            // Wait a moment for the UI to update
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Use helper window approach for better screen capture
            await this.captureWithHelperWindow();
            
        } catch (error) {
            console.error('Screenshot generation failed:', error);
            // Show error message but don't fall back to print
            this.showNotification('Screenshot capture was cancelled or failed.', 'warning');
        } finally {
            // Restore previous screenshot mode state
            if (!wasInScreenshotMode) {
                this.disableScreenshotMode();
            }
        }
    }

    async captureWithHelperWindow() {
        return new Promise((resolve, reject) => {
            // Open the separate helper HTML file
            const helper = window.open('./screenshot-helper.html', 'capture_helper', 'popup,width=500,height=300');
            
            if (!helper) {
                reject(new Error('Popup blocked. Please allow popups.'));
                return;
            }

            // Listen for messages from helper window
            const messageHandler = (e) => {
                if (e.data?.type === 'SUCCESS') {
                    window.removeEventListener('message', messageHandler);
                    this.showNotification('Screenshot captured successfully!', 'success');
                    resolve();
                } else if (e.data?.type === 'ERROR') {
                    window.removeEventListener('message', messageHandler);
                    this.showNotification('Screenshot capture was cancelled or failed.', 'warning');
                    reject(new Error(e.data.message));
                }
            };
            
            window.addEventListener('message', messageHandler);
            
            // Clean up if window is closed manually
            const checkClosed = setInterval(() => {
                if (helper.closed) {
                    clearInterval(checkClosed);
                    window.removeEventListener('message', messageHandler);
                    reject(new Error('Helper window was closed'));
                }
            }, 1000);
        });
    }
    
    async generateCanvasScreenshot() {
        try {
            const element = document.getElementById('app');
            const rect = element.getBoundingClientRect();
            
            // Create canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas dimensions (high resolution)
            const scale = 2;
            canvas.width = rect.width * scale;
            canvas.height = rect.height * scale;
            ctx.scale(scale, scale);
            
            // Set background
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, rect.width, rect.height);
            
            // Use CSS to style the element for better screenshot
            const originalStyle = element.style.cssText;
            element.style.cssText = `
                position: relative;
                width: ${rect.width}px;
                height: ${rect.height}px;
                background: white;
                overflow: visible;
            `;
            
            // Draw using html2canvas alternative approach
            await this.drawElementToCanvas(ctx, element, 0, 0, scale);
            
            // Restore original styles
            element.style.cssText = originalStyle;
            
            // Convert to blob and download
            canvas.toBlob((blob) => {
                if (blob) {
                    this.downloadBlob(blob, 'portfolio-screenshot.png');
                    this.showNotification('Screenshot downloaded successfully!', 'success');
                } else {
                    throw new Error('Failed to create image blob');
                }
            }, 'image/png', 0.9);
            
        } catch (error) {
            console.error('Canvas screenshot failed:', error);
            this.generateScreenshotFallback();
        }
    }
    
    async drawElementToCanvas(ctx, element, x, y, scale) {
        // Improved DOM traversal approach for better screenshot capture
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        
        // Skip hidden elements
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
            return;
        }
        
        // Draw background
        if (style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)') {
            ctx.fillStyle = style.backgroundColor;
            ctx.fillRect(x, y, rect.width, rect.height);
        }
        
        // Draw borders
        if (style.borderWidth && style.borderWidth !== '0px') {
            const borderWidth = parseFloat(style.borderWidth) || 1;
            ctx.strokeStyle = style.borderColor || '#000000';
            ctx.lineWidth = borderWidth;
            ctx.strokeRect(x, y, rect.width, rect.height);
        }
        
        // Draw text content for leaf elements or elements with direct text
        if (element.children.length === 0 && element.textContent.trim()) {
            ctx.fillStyle = style.color || '#000000';
            const fontSize = parseInt(style.fontSize) || 16;
            const fontFamily = style.fontFamily || 'Arial, sans-serif';
            ctx.font = `${fontSize}px ${fontFamily}`;
            
            const text = element.textContent.trim();
            const padding = 10;
            const lineHeight = fontSize * 1.2;
            
            // Simple text wrapping
            const maxWidth = rect.width - (padding * 2);
            const words = text.split(' ');
            let line = '';
            let lineY = y + padding + fontSize;
            
            for (let word of words) {
                const testLine = line + word + ' ';
                const metrics = ctx.measureText(testLine);
                
                if (metrics.width > maxWidth && line !== '') {
                    ctx.fillText(line.trim(), x + padding, lineY);
                    line = word + ' ';
                    lineY += lineHeight;
                } else {
                    line = testLine;
                }
            }
            if (line.trim()) {
                ctx.fillText(line.trim(), x + padding, lineY);
            }
        }
        
        // Recursively draw child elements
        for (let child of element.children) {
            const childRect = child.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();
            
            // Calculate relative position within parent
            const childX = x + (childRect.left - elementRect.left);
            const childY = y + (childRect.top - elementRect.top);
            
            await this.drawElementToCanvas(ctx, child, childX, childY, scale);
        }
    }
    
    downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const finalFilename = filename.replace('.png', `-${timestamp}.png`);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = finalFilename;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Cleanup
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
    
    generateScreenshotFallback() {
        this.showNotification('Opening print dialog for screenshot...', 'info');
        
        const element = document.getElementById('app');
        
        // Create a new window with the current portfolio view
        const printWindow = window.open('', '_blank');
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Portfolio Screenshot</title>
                <style>
                    ${document.querySelector('style') ? document.querySelector('style').innerHTML : ''}
                    <link rel="stylesheet" href="styles.css">
                    body { margin: 0; padding: 20px; background: white; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
                    .edit-only { display: none !important; }
                    @media print {
                        body { background: white !important; }
                        * { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }
                    }
                </style>
            </head>
            <body>
                ${element.outerHTML}
                <script>
                    window.onload = function() {
                        window.print();
                        setTimeout(() => window.close(), 1000);
                    };
                </script>
            </body>
            </html>
        `);
        
        printWindow.document.close();
        
        this.showNotification('Use your browser\'s print-to-PDF option to save as image', 'info');
    }

    generatePrintStatement() {
        this.showNotification('Opening Investment Account Statement for printing...', 'info');
        
        const element = document.getElementById('app');
        
        // Create a new window with a clean statement view
        const printWindow = window.open('', '_blank');
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Investment Account Statement</title>
                <style>
                    body { 
                        margin: 0; 
                        padding: 20px; 
                        background: white; 
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                        color: black;
                        line-height: 1.4;
                    }
                    .edit-only { display: none !important; }
                    h1, h2, h3 { 
                        color: black; 
                        margin: 10px 0;
                    }
                    h1 { 
                        text-align: center; 
                        border-bottom: 2px solid black; 
                        padding-bottom: 10px;
                        font-size: 24px;
                    }
                    .statement-header {
                        text-align: center;
                        margin-bottom: 30px;
                    }
                    .statement-date {
                        text-align: right;
                        margin-bottom: 20px;
                        font-style: italic;
                    }
                    @media print {
                        body { background: white !important; }
                        * { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }
                        @page { margin: 0.5in; }
                    }
                </style>
            </head>
            <body>
                <div class="statement-header">
                    <h1>Investment Account Statement</h1>
                </div>
                <div class="statement-date">
                    Statement Date: ${new Date().toLocaleDateString()}
                </div>
                ${element.outerHTML}
                <script>
                    window.onload = function() {
                        window.print();
                        setTimeout(() => window.close(), 1000);
                    };
                </script>
            </body>
            </html>
        `);
        
        printWindow.document.close();
        
        this.showNotification('Use your browser\'s print option to print the statement', 'info');
    }

    copyStatementToClipboard() {
        try {
            // Get broker name
            const brokerNameElement = document.getElementById('broker-name-text');
            const brokerName = brokerNameElement ? brokerNameElement.textContent : 'Investment Portfolio';
            
            // Generate statement header
            const statementDate = new Date().toLocaleDateString();
            let statement = `${brokerName}\n`;
            statement += `Investment Account Statement\n`;
            statement += `Statement Date: ${statementDate}\n`;
            statement += `${'='.repeat(60)}\n\n`;
            
            // Get currency symbol
            const currencySymbol = this.getCurrentCurrencySymbol();
            
            // Portfolio Summary
            const totalValue = this.calculateTotalValue();
            const totalInvested = this.calculateTotalInvested();
            const totalChange = totalValue - totalInvested;
            const changePercent = totalInvested > 0 ? ((totalChange / totalInvested) * 100) : 0;
            
            statement += `PORTFOLIO SUMMARY\n`;
            statement += `${'-'.repeat(60)}\n`;
            statement += `Total Portfolio Value: ${currencySymbol}${this.formatCurrency(totalValue)}\n`;
            
            // Only include profit/loss if BOTH showProfit is enabled AND price volatility is enabled
            if (this.settings.showProfit && this.settings.enablePriceVolatility) {
                statement += `Total Change: ${totalChange >= 0 ? '+' : ''}${currencySymbol}${this.formatCurrency(totalChange)} (${totalChange >= 0 ? '+' : ''}${changePercent.toFixed(2)}%)\n`;
            }
            
            statement += `Available Balance: ${currencySymbol}${this.formatCurrency(this.balance)}\n`;
            statement += `\n`;
            
            // Holdings
            const activeAssets = this.assets.filter(asset => asset.quantity > 0);
            
            if (activeAssets.length > 0) {
                statement += `HOLDINGS\n`;
                statement += `${'-'.repeat(60)}\n`;
                
                activeAssets.forEach(asset => {
                    const value = asset.quantity * asset.currentPrice;
                    const change = value - (asset.quantity * asset.initialPrice);
                    const buyInValue = asset.quantity * asset.initialPrice;
                    const changePercent = buyInValue > 0 ? ((change / buyInValue) * 100) : 0;
                    
                    statement += `${asset.symbol} - ${asset.name}\n`;
                    statement += `  ${this.formatQuantity(asset.quantity)} shares @ ${currencySymbol}${this.formatCurrency(asset.currentPrice)}\n`;
                    statement += `  Buy-in Value: ${currencySymbol}${this.formatCurrency(value)}\n`;
                    
                    // Only include profit/loss if BOTH showProfit is enabled AND price volatility is enabled
                    if (this.settings.showProfit && this.settings.enablePriceVolatility) {
                        statement += `  Change: ${change >= 0 ? '+' : ''}${currencySymbol}${this.formatCurrency(change)} (${changePercent.toFixed(2)}%)\n`;
                    }
                    
                    statement += `\n`;
                });
            }
            
            // Copy to clipboard
            navigator.clipboard.writeText(statement).then(() => {
                this.showNotification('Portfolio statement copied to clipboard!', 'success');
            }).catch(err => {
                console.error('Failed to copy to clipboard:', err);
                this.showNotification('Failed to copy to clipboard. Please try again.', 'error');
            });
            
        } catch (error) {
            console.error('Error generating statement:', error);
            this.showNotification('Error generating statement. Please try again.', 'error');
        }
    }

    // Broker Name Management
    initializeBrokerName() {
        const customName = localStorage.getItem(`fake-portfolio-broker-name-${this.currentTheme}`);
        const brokerNameText = document.getElementById('broker-name-text');
        
        if (customName && brokerNameText) {
            brokerNameText.textContent = customName;
        } else if (brokerNameText) {
            brokerNameText.textContent = this.themes[this.currentTheme].brokerName;
        }
    }

    showBrokerNameEditor() {
        const brokerNameText = document.getElementById('broker-name-text');
        if (!brokerNameText) return;
        
        const currentName = brokerNameText.textContent;
        
        // Create input element
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentName;
        input.className = 'broker-name-input';
        input.style.cssText = `
            background: rgba(255,255,255,0.9);
            border: 2px solid var(--primary-color);
            border-radius: 4px;
            padding: 0.25rem 0.5rem;
            font-size: 1.75rem;
            font-weight: 700;
            color: var(--text-primary);
            min-width: 300px;
        `;
        
        // Replace text with input
        const parent = brokerNameText.parentNode;
        parent.replaceChild(input, brokerNameText);
        input.focus();
        input.select();
        
        // Handle save on Enter or blur
        const saveName = () => {
            if (!input.parentNode) return; // Check if input still exists
            
            const newName = input.value.trim() || this.themes[this.currentTheme].brokerName;
            
            // Save to localStorage if different from default
            if (newName !== this.themes[this.currentTheme].brokerName) {
                localStorage.setItem(`fake-portfolio-broker-name-${this.currentTheme}`, newName);
            } else {
                localStorage.removeItem(`fake-portfolio-broker-name-${this.currentTheme}`);
            }
            
            // Create new text element
            const newTextElement = document.createElement('span');
            newTextElement.id = 'broker-name-text';
            newTextElement.textContent = newName;
            
            // Replace input with text
            if (input.parentNode) {
                input.parentNode.replaceChild(newTextElement, input);
            }
        };
        
        const cancelEdit = () => {
            if (!input.parentNode) return; // Check if input still exists
            
            // Cancel editing
            const newTextElement = document.createElement('span');
            newTextElement.id = 'broker-name-text';
            newTextElement.textContent = currentName;
            
            if (input.parentNode) {
                input.parentNode.replaceChild(newTextElement, input);
            }
        };
        
        input.addEventListener('blur', saveName, { once: true });
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                saveName();
            } else if (e.key === 'Escape') {
                cancelEdit();
            }
        }, { once: true });
    }

    showBalanceEditor() {
        const balanceValueText = document.getElementById('balance-value');
        if (!balanceValueText) return;
        
        const currentBalance = this.balance;
        const currencySymbol = this.getCurrentCurrencySymbol();
        
        // Convert balance to current currency for editing
        const currency = this.currencies[this.settings.currency];
        const convertedBalance = currentBalance * currency.rate;
        
        // Create input element
        const input = document.createElement('input');
        input.type = 'number';
        input.value = convertedBalance.toFixed(2);
        input.step = '0.01';
        input.min = '0';
        input.className = 'balance-input';
        input.style.cssText = `
            background: rgba(255,255,255,0.9);
            border: 2px solid var(--primary-color);
            border-radius: 4px;
            padding: 0.25rem 0.5rem;
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--text-primary);
            min-width: 200px;
            text-align: right;
        `;
        
        // Replace text with input
        const parent = balanceValueText.parentNode;
        parent.replaceChild(input, balanceValueText);
        input.focus();
        input.select();
        
        // Handle save on Enter or blur
        const saveBalance = () => {
            if (!input.parentNode) return; // Check if input still exists
            
            const newBalanceInCurrentCurrency = parseFloat(input.value) || 0;
            // Convert back to USD for storage
            const currency = this.currencies[this.settings.currency];
            const newBalanceInUSD = newBalanceInCurrentCurrency / currency.rate;
            this.balance = Math.max(0, newBalanceInUSD); // Ensure balance is not negative
            this.saveBalance();
            
            // Create new text element
            const newTextElement = document.createElement('span');
            newTextElement.id = 'balance-value';
            newTextElement.textContent = this.formatCurrency(this.balance);
            
            // Replace input with text
            if (input.parentNode) {
                input.parentNode.replaceChild(newTextElement, input);
            }
        };
        
        const cancelEdit = () => {
            if (!input.parentNode) return; // Check if input still exists
            
            // Cancel editing
            const newTextElement = document.createElement('span');
            newTextElement.id = 'balance-value';
            newTextElement.textContent = this.formatCurrency(currentBalance);
            
            if (input.parentNode) {
                input.parentNode.replaceChild(newTextElement, input);
            }
        };
        
        input.addEventListener('blur', saveBalance, { once: true });
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                input.blur(); // This will trigger save via the blur event
            } else if (e.key === 'Escape') {
                e.preventDefault();
                cancelEdit();
            }
        }, { once: true });
    }

    // Institutional Account Management
    updateDarkPoolVisibility() {
        const darkPoolSection = document.getElementById('dark-pool-section');
        if (darkPoolSection) {
            darkPoolSection.style.display = this.settings.institutionalAccount ? 'flex' : 'none';
        }
    }

    updateInstitutionalBadge() {
        let badge = document.getElementById('institutional-badge');
        
        if (this.settings.institutionalAccount) {
            // Create badge if it doesn't exist
            if (!badge) {
                badge = document.createElement('div');
                badge.id = 'institutional-badge';
                badge.className = 'institutional-badge';
                badge.innerHTML = '<i class="fas fa-crown"></i> <span>INSTITUTIONAL</span>';
                
                // Insert badge into header
                const header = document.querySelector('.app-header');
                if (header) {
                    header.appendChild(badge);
                }
            }
        } else {
            // Remove badge if it exists
            if (badge) {
                badge.remove();
            }
        }
    }

    updateDiscountFieldVisibility() {
        const assetDiscountField = document.getElementById('asset-discount-field');
        const transactionDiscountField = document.getElementById('transaction-discount-field');
        
        const showDiscount = this.settings.institutionalAccount && this.settings.darkPoolAccess;
        
        if (assetDiscountField) {
            assetDiscountField.style.display = showDiscount ? 'flex' : 'none';
            // Clear discount value when hiding
            if (!showDiscount) {
                document.getElementById('asset-discount').value = '';
            }
        }
        
        if (transactionDiscountField) {
            transactionDiscountField.style.display = showDiscount ? 'flex' : 'none';
            // Clear discount value when hiding
            if (!showDiscount) {
                document.getElementById('transaction-discount').value = '';
            }
        }
    }

    // Theme Management
    cycleTheme() {
        const themeKeys = Object.keys(this.themes);
        const currentIndex = themeKeys.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themeKeys.length;
        this.currentTheme = themeKeys[nextIndex];
        
        // Save theme to settings
        this.settings.theme = this.currentTheme;
        this.saveSettings();
        
        // Remove all theme classes
        themeKeys.forEach(theme => {
            document.body.classList.remove(`theme-${theme}`);
        });
        
        // Add new theme class
        if (this.currentTheme !== 'default') {
            document.body.classList.add(`theme-${this.currentTheme}`);
        }
        
        // Update button text
        document.getElementById('theme-selector').innerHTML = 
            `<i class="fas fa-palette"></i> <span data-i18n="menu.theme">Theme:</span> ${this.themes[this.currentTheme].name}`;
        
        // Reapply translations to the button after updating innerHTML
        i18n.applyTranslations();
        
        // Update broker name for new theme
        this.initializeBrokerName();
    }

    updateViews() {
        this.updatePortfolio();
    }

    // Notification System
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${this.getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Position notification
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '9999';
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 4000);
        
        // Add close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
    }
    
    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    // Data Persistence
    saveAssets() {
        localStorage.setItem('fake-portfolio-assets', JSON.stringify(this.assets));
    }

    loadAssets() {
        const saved = localStorage.getItem('fake-portfolio-assets');
        return saved ? JSON.parse(saved) : [];
    }

    saveTransactions() {
        localStorage.setItem('fake-portfolio-transactions', JSON.stringify(this.transactions));
    }

    loadTransactions() {
        const saved = localStorage.getItem('fake-portfolio-transactions');
        return saved ? JSON.parse(saved) : [];
    }

    saveSettings() {
        localStorage.setItem('fake-portfolio-settings', JSON.stringify(this.settings));
    }

    loadSettings() {
        const saved = localStorage.getItem('fake-portfolio-settings');
        return saved ? JSON.parse(saved) : { 
            currency: 'USD', 
            theme: 'default', 
            showProfit: true, 
            enablePriceVolatility: false,
            institutionalAccount: false,
            darkPoolAccess: false
        };
    }

    saveBalance() {
        localStorage.setItem('fake-portfolio-balance', JSON.stringify(this.balance));
    }

    loadBalance() {
        const saved = localStorage.getItem('fake-portfolio-balance');
        return saved ? JSON.parse(saved) : null; // null indicates not initialized
    }

    // Initialize balance with 1000 EUR equivalent
    initializeBalance() {
        if (this.balance === null) {
            // Convert 1000 EUR to USD for storage
            const eurToUsd = 1.0 / 0.85; // EUR rate is 0.85, so 1 EUR = 1.176 USD
            this.balance = 1000 * eurToUsd; // 1000 EUR in USD (~1176.47)
            this.saveBalance();
        }
    }
}

/**
 * Intro Modal Manager
 * Handles the first-visit introduction modal with multiple steps
 */
class IntroModalManager {
    constructor() {
        this.modal = document.getElementById('intro-modal');
        this.currentStep = 1;
        this.totalSteps = 4;
        this.storageKey = 'fake-portfolio-intro-shown';
        
        this.initializeElements();
        this.attachEventListeners();
    }

    initializeElements() {
        this.steps = document.querySelectorAll('.intro-step');
        this.stepDots = document.querySelectorAll('.step-dot');
        this.prevBtn = document.getElementById('intro-prev-btn');
        this.nextBtn = document.getElementById('intro-next-btn');
        this.finishBtn = document.getElementById('intro-finish-btn');
        this.skipBtn = document.getElementById('intro-skip-btn');
        this.dontShowCheckbox = document.getElementById('dont-show-intro-again');
        this.closeButtons = this.modal.querySelectorAll('.close-modal');
    }

    attachEventListeners() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.previousStep());
        this.nextBtn.addEventListener('click', () => this.nextStep());
        this.finishBtn.addEventListener('click', () => this.closeModal());
        this.skipBtn.addEventListener('click', () => this.closeModal());
        
        // Close buttons
        this.closeButtons.forEach(btn => {
            btn.addEventListener('click', () => this.closeModal());
        });
        
        // Step dots navigation
        this.stepDots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToStep(index + 1));
        });
        
        // Close on outside click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
    }

    shouldShow() {
        // Check if intro has been shown before
        const introShown = localStorage.getItem(this.storageKey);
        return !introShown;
    }

    show() {
        this.modal.classList.add('active');
        this.goToStep(1);
        // Apply translations to dynamic content
        i18n.applyTranslations();
    }

    closeModal() {
        // Save preference if checkbox is checked
        if (this.dontShowCheckbox.checked) {
            localStorage.setItem(this.storageKey, 'true');
        }
        
        this.modal.classList.remove('active');
    }

    goToStep(step) {
        if (step < 1 || step > this.totalSteps) return;
        
        this.currentStep = step;
        this.updateStepDisplay();
        this.updateButtons();
    }

    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.goToStep(this.currentStep + 1);
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.goToStep(this.currentStep - 1);
        }
    }

    updateStepDisplay() {
        // Update step visibility
        this.steps.forEach((step, index) => {
            if (index + 1 === this.currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Update step indicators
        this.stepDots.forEach((dot, index) => {
            if (index + 1 === this.currentStep) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    updateButtons() {
        // Show/hide previous button
        if (this.currentStep === 1) {
            this.prevBtn.style.display = 'none';
        } else {
            this.prevBtn.style.display = 'inline-block';
        }
        
        // Show/hide next and finish buttons
        if (this.currentStep === this.totalSteps) {
            this.nextBtn.style.display = 'none';
            this.finishBtn.style.display = 'inline-block';
        } else {
            this.nextBtn.style.display = 'inline-block';
            this.finishBtn.style.display = 'none';
        }
    }
}

// Initialize the application
let app;
let introModal;
document.addEventListener('DOMContentLoaded', () => {
    // Apply translations based on browser language
    i18n.applyTranslations();
    
    app = new InvestmentPortfolio();
    
    // Initialize and show intro modal if first visit
    introModal = new IntroModalManager();
    if (introModal.shouldShow()) {
        // Delay showing modal slightly to ensure page is fully loaded
        setTimeout(() => {
            introModal.show();
        }, 500);
    }
});

// Add some sample data for demonstration
function addSampleData() {
    if (app.assets.length === 0) {
        // Add sample assets
        const sampleAssets = [
            { symbol: 'AAPL', name: 'Apple Inc.', quantity: 10, currentPrice: 150.00, initialPrice: 140.00 },
            { symbol: 'BTC', name: 'Bitcoin', quantity: 0.5, currentPrice: 45000.00, initialPrice: 40000.00 },
            { symbol: 'TSLA', name: 'Tesla Inc.', quantity: 5, currentPrice: 800.00, initialPrice: 750.00 }
        ];

        sampleAssets.forEach(assetData => {
            const asset = {
                id: app.generateId(),
                ...assetData
            };
            app.assets.push(asset);

            // Add initial transaction
            const transaction = {
                id: app.generateId(),
                assetId: asset.id,
                type: 'buy',
                quantity: asset.quantity,
                price: asset.initialPrice,
                date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
                total: asset.quantity * asset.initialPrice
            };
            app.transactions.push(transaction);
        });

        app.saveAssets();
        app.saveTransactions();
        app.updatePortfolio();
    }
}