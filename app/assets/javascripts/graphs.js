document.addEventListener("turbolinks:load", () => {
  // ここに， 「app/views/graphs/index.html.erb」の「script」タグ内をここに移動
  // <script></script>をいれないこと！

  // 本来 Javascript をここに書くべきではありません。プログラムの移動方法は後に解説します
  let lineLabel = gon.chart_label;
  let lineData = gon.chart_data;

  // 折れ線グラフのオプション

  const lineChartData = {
    labels: lineLabel,
    datasets: [
      {
        label: "体重(kg)",
        data: lineData,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        spanGaps: true,
      },
    ],
  };

  const lineChartOption = {
    title: {
      display: true,
      text: "折れ線グラフ",
    },
    tooltips: {
      callbacks: {
        // ホバー（スマホならタップ）時のラベル表示を変更
        title: function (tooltipItems) {
          return tooltipItems[0].xLabel.replace(
            /^(\d+).(\d+)$/,
            " $1 月 $2 日"
          );
        },
        label: function (tooltipItem) {
          return "体重: " + tooltipItem.yLabel + "kg";
        },
      },
    },
  };

  // 折れ線グラフを表示
  const lineChartContext = document
    .getElementById("line-chart")
    .getContext("2d");
  new Chart(lineChartContext, {
    type: "line",
    data: lineChartData,
    options: lineChartOption,
  });
});
