angular.module('app.core_gd').filter('highlightKeywords', ['$sce', function ($sce) {
    return function (textToHighlight, keywords) {
        var filteredText = textToHighlight;
        if (keywords !== "") {
            var keywordList = keywords.match(/\S+/g);
            var pattern = new RegExp("(^|\\b)(" + keywordList.join("|") + ")", "gi");
            filteredText = textToHighlight.replace(pattern, '<span class="highlighted">$2</span>');
        }
        return $sce.trustAsHtml(filteredText);
    };
}]);
