!(function (e) {
    var t = {
        init: function (a) {
            var s = e.extend(
                    {
                        items: 1,
                        itemsOnPage: 1,
                        pages: 0,
                        displayedPages: 3,
                        edges: 1,
                        currentPage: 0,
                        useAnchors: !0,
                        hrefTextPrefix: "#page-",
                        hrefTextSuffix: "",
                        prevText: "Prev",
                        nextText: "Next",
                        ellipseText: "&hellip;",
                        ellipsePageSet: !0,
                        cssStyle: "light-theme",
                        listStyle: "",
                        labelMap: [],
                        selectOnClick: !0,
                        nextAtFront: !1,
                        invertPageOrder: !1,
                        useStartEdge: !0,
                        useEndEdge: !0,
                        onPageClick: function (e, t) {},
                        onInit: function () {},
                    },
                    a || {}
                ),
                n = this;
            return (
                (s.pages = s.pages ? s.pages : Math.ceil(s.items / s.itemsOnPage) ? Math.ceil(s.items / s.itemsOnPage) : 1),
                s.currentPage ? (s.currentPage = s.currentPage - 1) : (s.currentPage = s.invertPageOrder ? s.pages - 1 : 0),
                (s.halfDisplayed = s.displayedPages / 2),
                this.each(function () {
                    n.addClass(s.cssStyle + " simple-pagination").data("pagination", s), t._draw.call(n);
                }),
                s.onInit(),
                this
            );
        },
        selectPage: function (e) {
            return t._selectPage.call(this, e - 1), this;
        },
        prevPage: function () {
            var e = this.data("pagination");
            return e.invertPageOrder ? e.currentPage < e.pages - 1 && t._selectPage.call(this, e.currentPage + 1) : e.currentPage > 0 && t._selectPage.call(this, e.currentPage - 1), this;
        },
        nextPage: function () {
            var e = this.data("pagination");
            return e.invertPageOrder ? e.currentPage > 0 && t._selectPage.call(this, e.currentPage - 1) : e.currentPage < e.pages - 1 && t._selectPage.call(this, e.currentPage + 1), this;
        },
        getPagesCount: function () {
            return this.data("pagination").pages;
        },
        setPagesCount: function (e) {
            this.data("pagination").pages = e;
        },
        getCurrentPage: function () {
            return this.data("pagination").currentPage + 1;
        },
        destroy: function () {
            return this.empty(), this;
        },
        drawPage: function (e) {
            var a = this.data("pagination");
            return (a.currentPage = e - 1), this.data("pagination", a), t._draw.call(this), this;
        },
        redraw: function () {
            return t._draw.call(this), this;
        },
        disable: function () {
            var e = this.data("pagination");
            return (e.disabled = !0), this.data("pagination", e), t._draw.call(this), this;
        },
        enable: function () {
            var e = this.data("pagination");
            return (e.disabled = !1), this.data("pagination", e), t._draw.call(this), this;
        },
        updateItems: function (e) {
            var a = this.data("pagination");
            (a.items = e), (a.pages = t._getPages(a)), this.data("pagination", a), t._draw.call(this);
        },
        updateItemsOnPage: function (e) {
            var a = this.data("pagination");
            return (a.itemsOnPage = e), (a.pages = t._getPages(a)), this.data("pagination", a), t._selectPage.call(this, 0), this;
        },
        getItemsOnPage: function () {
            return this.data("pagination").itemsOnPage;
        },
        _draw: function () {
            var a,
                s = this.data("pagination"),
                n = t._getInterval(s);
            t.destroy.call(this);
            var i = "UL" === ("function" == typeof this.prop ? this.prop("tagName") : this.attr("tagName")) ? this : e("<ul" + (s.listStyle ? ' class="' + s.listStyle + '"' : "") + "></ul>").appendTo(this);
            if (
                (s.prevText && t._appendItem.call(this, s.invertPageOrder ? s.currentPage + 1 : s.currentPage - 1, { text: s.prevText, classes: "prev" }),
                s.nextText && s.nextAtFront && t._appendItem.call(this, s.invertPageOrder ? s.currentPage - 1 : s.currentPage + 1, { text: s.nextText, classes: "next" }),
                s.invertPageOrder)
            ) {
                if (n.end < s.pages && s.edges > 0) {
                    if (s.useStartEdge) {
                        var l = Math.max(s.pages - s.edges, n.end);
                        for (a = s.pages - 1; a >= l; a--) t._appendItem.call(this, a);
                    }
                    s.pages - s.edges > n.end && s.pages - s.edges - n.end != 1 ? i.append('<li class="disabled"><span class="ellipse">' + s.ellipseText + "</span></li>") : s.pages - s.edges - n.end == 1 && t._appendItem.call(this, n.end);
                }
            } else if (n.start > 0 && s.edges > 0) {
                if (s.useStartEdge) {
                    var r = Math.min(s.edges, n.start);
                    for (a = 0; a < r; a++) t._appendItem.call(this, a);
                }
                s.edges < n.start && n.start - s.edges != 1 ? i.append('<li class="disabled"><span class="ellipse">' + s.ellipseText + "</span></li>") : n.start - s.edges == 1 && t._appendItem.call(this, s.edges);
            }
            if (s.invertPageOrder) for (a = n.end - 1; a >= n.start; a--) t._appendItem.call(this, a);
            else for (a = n.start; a < n.end; a++) t._appendItem.call(this, a);
            if (s.invertPageOrder) {
                if (
                    n.start > 0 &&
                    s.edges > 0 &&
                    (s.edges < n.start && n.start - s.edges != 1 ? i.append('<li class="disabled"><span class="ellipse">' + s.ellipseText + "</span></li>") : n.start - s.edges == 1 && t._appendItem.call(this, s.edges), s.useEndEdge)
                )
                    for (a = (r = Math.min(s.edges, n.start)) - 1; a >= 0; a--) t._appendItem.call(this, a);
            } else if (
                n.end < s.pages &&
                s.edges > 0 &&
                (s.pages - s.edges > n.end && s.pages - s.edges - n.end != 1 ? i.append('<li class="disabled"><span class="ellipse">' + s.ellipseText + "</span></li>") : s.pages - s.edges - n.end == 1 && t._appendItem.call(this, n.end),
                s.useEndEdge)
            )
                for (a = l = Math.max(s.pages - s.edges, n.end); a < s.pages; a++) t._appendItem.call(this, a);
            s.nextText && !s.nextAtFront && t._appendItem.call(this, s.invertPageOrder ? s.currentPage - 1 : s.currentPage + 1, { text: s.nextText, classes: "next" }), s.ellipsePageSet && !s.disabled && t._ellipseClick.call(this, i);
        },
        _getPages: function (e) {
            return Math.ceil(e.items / e.itemsOnPage) || 1;
        },
        _getInterval: function (e) {
            return {
                start: Math.ceil(e.currentPage > e.halfDisplayed ? Math.max(Math.min(e.currentPage - e.halfDisplayed, e.pages - e.displayedPages), 0) : 0),
                end: Math.ceil(e.currentPage > e.halfDisplayed ? Math.min(e.currentPage + e.halfDisplayed, e.pages) : Math.min(e.displayedPages, e.pages)),
            };
        },
        _appendItem: function (a, s) {
            var n,
                i,
                l = this,
                r = l.data("pagination"),
                p = e("<li></li>"),
                d = l.find("ul");
            if (((n = { text: (a = a < 0 ? 0 : a < r.pages ? a : r.pages - 1) + 1, classes: "" }), r.labelMap.length && r.labelMap[a] && (n.text = r.labelMap[a]), (n = e.extend(n, s || {})), a == r.currentPage || r.disabled)) {
                r.disabled || "prev" === n.classes || "next" === n.classes ? p.addClass("disabled") : p.addClass("active"), (i = e('<span class="current">' + n.text + "</span>"));
                let t = window.location.href;
                window.history.pushState(t, "Title", "/pages/plum-beauty-tips-tricks"), console.log("hjsdgjdghj");
            } else
                (i = r.useAnchors ? e('<a href="' + r.hrefTextPrefix + (a + 1) + r.hrefTextSuffix + '" class="page-link">' + n.text + "</a>") : e("<span >" + n.text + "</span>")).click(function (e) {
                    return t._selectPage.call(l, a, e);
                });
            n.classes && i.addClass(n.classes), p.append(i), d.length ? d.append(p) : l.append(p);
        },
        _selectPage: function (e, a) {
            var s = this.data("pagination");
            return (s.currentPage = e), s.selectOnClick && t._draw.call(this), s.onPageClick(e + 1, a);
        },
        _ellipseClick: function (a) {
            var s = this,
                n = this.data("pagination"),
                i = a.find(".ellipse");
            i.addClass("clickable").parent().removeClass("disabled"),
                i.click(function (a) {
                    if (!n.disable) {
                        var l = e(this),
                            r = (parseInt(l.parent().prev().text(), 10) || 0) + 1;
                        l.html('<input type="number" min="1" max="' + n.pages + '" step="1" value="' + r + '">')
                            .find("input")
                            .focus()
                            .click(function (e) {
                                e.stopPropagation();
                            })
                            .keyup(function (a) {
                                var l = e(this).val();
                                13 === a.which && "" !== l ? l > 0 && l <= n.pages && t._selectPage.call(s, l - 1) : 27 === a.which && i.empty().html(n.ellipseText);
                            })
                            .bind("blur", function (a) {
                                var l = e(this).val();
                                return "" !== l && t._selectPage.call(s, l - 1), i.empty().html(n.ellipseText), !1;
                            });
                    }
                    return !1;
                });
        },
    };
    e.fn.pagination = function (a) {
        return t[a] && "_" != a.charAt(0) ? t[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof a && a ? void e.error("Method " + a + " does not exist on jQuery.pagination") : t.init.apply(this, arguments);
    };
})(jQuery),
    $(document).on("click", "div#pagination-container ul li a", function (e) {
        e.preventDefault();
        let t = window.location.href;
        window.history.pushState(t, "Title", "/pages/plum-beauty-tips-tricks");
    });
