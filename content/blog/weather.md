---
title: 'Predicting the Unpredictable: AI-Powered Weather Forecasting for Hailstorm in Japan'
date: Thu, 01 Jan 2009 14:09:10 +0000
draft: false
tags: ["Python","Pytorch","GenAI","Computer Vision","AWS", "Gitlab", "Weather"]
image: "/images/weather/weather_icon.gif"
featured: true
description: "Japan, a nation celebrated for its stunning natural beauty, also grapples with the persistent threat of severe weather events. From typhoons and earthquakes to torrential rains, snowstorms, and hailstorms, these disasters often result in significant damage to property, infrastructure, and, most tragically, human life. In such a volatile environment, timely and precise weather information is essential for safeguarding public safety and mitigating the effects of these events. This post highlights a cutting-edge weather forecast model specifically designed for hail prediction. Remarkably, this model outperforms the Japan Meteorological Agency's (JMA) existing hail prediction model, achieving an accuracy rate of 72%—a substantial improvement of 17% over JMA's 55%."
---

<div style="text-align:justify">
&emsp; The skies over Japan often paint a dramatic picture, with thunderstorms booming, strong winds blowing, and hailstones crashing onto rooftops and fields. During this severe weather, communities prepare for the worst, farmers try to save their crops, and emergency services get ready to help. However, predicting hail – a weather event that can cause serious damage to people and property – has always been a difficult and uncertain task. But what if this challenge could be tackled with precision and foresight using the power of Artificial Intelligence?

&emsp; This post provide general information of a Hail Forecast system used in <a href="https://www.mti.co.jp/?p=33519">Hail Alert Service in Japan provided by MTI </a> By harnessing state-of-the-art machine learning algorithms and analyzing extensive historical weather radar data, this system aims to:

* **Improve accuracy and lead time:** Provide more accurate and timely predictions of hail events. 
* **Enhance early warning systems:** Empower weather information service providers to issue more precise and timely warnings to the public, allowing for swift evacuation and precautionary measures.
* **Enable proactive risk management:** Equip individuals, businesses, and government agencies with the necessary information to proactively assess risks and implement effective mitigation strategies.

</div>

<div style="text-align:center">
    <a href="#demo"> 
        <button class="button-56" style="color:red"><img src="/images/down-arrow.gif" style="width:30px;height:30px" />See demonstration !!!</button> 
    </a>
</div>

I. Basics - What is hail?
-----
<div style="text-align:justify">
&emsp; Hail is a type of precipitation made up of solid ice that forms within the strong updrafts of thunderstorms. As water droplets are lifted high into the cold upper layers of a storm, they freeze into layers of ice, eventually falling to the ground as hailstones when they become too heavy for the updrafts to support. Hail poses a significant threat, capable of damaging aircraft, vehicles, homes, and even crops. It can also be fatal to livestock and dangerous to people. Hailstones vary widely in size, ranging from as small as a pea (1/4 inch in diameter) to as large as a grapefruit (4 1/2 inches in diameter). Hailstones of quarter size (1 inch) or larger are classified as severe, with larger sizes, such as golf balls (1 3/4 inches) or softballs (4 inches), causing extensive damage.
</div>

{{< figure src="/images/weather/hail_size.png" width=70%  title="Table 1. Classification of hail sizes and their severity levels" >}}

<div>Figure 1 shows some images of hail</div>
{{< figure src="/images/weather/hail_illustration.png" width=70%  title="Fig 1. Illustration of Hail" >}}

<hr/>

II. Approaches to Predict Hail
-----
<div style="text-align:justify">
&emsp; Predicting hail involves analyzing specific atmospheric conditions and radar signals that indicate the likelihood of hail formation. Various methods leverage radar reflectivity, liquid water content, updraft strength, and temperature zones to identify hail-producing environments.

&emsp; Radar data, particularly reflectivity (Z) and Vertically Integrated Liquid (VIL), plays a crucial role in predicting hail due to its ability to provide detailed and real-time information about atmospheric conditions. High reflectivity values on radar indicate the presence of highly reflective targets, such as hailstones, making it a direct and effective indicator for hail detection. Similarly, VIL measures the total liquid water content in a vertical column of the atmosphere, which helps identify areas with high concentrations of supercooled droplets essential for hail formation. Compared to other methods like analyzing updraft strength or temperature zones, radar-based approaches offer the advantage of immediate and localized insights, enabling meteorologists to track and predict hail events with greater precision and timeliness. This makes radar data an invaluable tool for real-time monitoring and early warning systems.


1. **High Reflectivity Detection**  
   - Use high reflectivity values to identify highly reflecting targets, which may indicate hail.  
   - **Methods**: CAPPI (Constant Altitude Plan Position Indicator) and ZMAX.

2. **Liquid Water Content Analysis**  
   - Detect areas with high liquid water content, as this may indicate the presence of supercooled droplets essential for hail formation.  
   - **Methods**: VIL (Vertically Integrated Liquid) and VILD (Vertically Integrated Liquid Density).

3. **Updraft Strength and Melting Layer Analysis**  
   - Identify strong updrafts capable of suspending hail-sized targets, ensuring a supercooled water supply and analyzing the vertical extent of the melting layer.  
   - **Method**: Waldvogel.

4. **Above-Freezing Temperature Zone Analysis**  
   - Focus on the area above the 0 °C isotherm, where hail is likely to form.  
   - **Method**: POSH (Probability of Severe Hail).

</div>
<hr/>

III. Proposed Solution: Leveraging Reflectivity and VIL for Hail Prediction
-----
### 1. Data Preparation
<div style="text-align:justify">
&emsp; Generating composite data from raw radar system outputs, such as those provided by DIAS and MTI Technology, is essential for accurate and actionable weather predictions, including hail forecasting. Raw radar data often contains noise and isolated signals that may not directly convey useful insights. By processing and integrating this raw data into composite formats, key meteorological parameters—such as reflectivity, Vertically Integrated Liquid (VIL), and Doppler velocity—can be extracted and analyzed effectively. Composite data enables a more comprehensive understanding of weather structures and dynamics by combining information from multiple radar scans and angles, thereby enhancing accuracy. This process is crucial for identifying potential hail-producing conditions, as it allows meteorologists to detect high reflectivity values and areas with significant liquid water content more reliably. Moreover, composite data supports better visualization and interpretation, providing the foundation for real-time decision-making and early warning systems. Figure 2 shows the proposed radar procesisng pipeline

{{< figure src="/images/weather/data_pipeline.png" width=70%  title="Fig 2. Data processing pipeline" >}}

This flowchart illustrates the process of generating composite radar data from raw inputs, specifically using C-Band and X-Band radar systems. The steps are as follows:

1. **Decode File**: Raw data from both C-Band and X-Band radar systems is decoded.  
2. **Data Normalization and Thresholding**: The decoded data is normalized and thresholded to standardize it for further processing.  
3. **Noise Removal**: Noise in the radar signals is removed to enhance data quality.  
4. **Filling Missing Data in Space**: Missing spatial data is interpolated using spatial interpolation methods in both polar and Cartesian coordinates.  
5. **Extrapolation of Data in Time**: Temporal interpolation is performed to address gaps in the time dimension, ensuring continuity in radar measurements.  
6. **Correcting Reflectivity Measurement**: Radar reflectivity values are corrected to account for attenuation and inaccuracies in measurements.  
   - **Attenuation Adjustment**: Attenuation effects are corrected for better accuracy.  
   - **Temporal Alignment**: Data from both radar bands is aligned temporally to ensure consistency.  
7. **Blending**: Finally, the processed data from both radar bands is blended to generate a unified composite dataset for further analysis or visualization.

Figure 3 show the pre-processed data (reflectivity - Z) for forecast pipeline
{{< figure src="/images/weather/blended_result.png" width=70%  title="Fig 3. Pre-processed data for hail forecast" >}}

</div>

### 2. Forecast pipeline
<div style="text-align:justify">
&emsp; The blended reflectivity data, which combines information from multiple radar sources, is utilized to compute the Vertically Integrated Liquid (VIL) parameter. VIL represents the total liquid water content within a column of the atmosphere, which is a key indicator for severe weather, particularly hail formation. By leveraging both the blended reflectivity and VIL, the system can predict the likelihood and severity of hail events. The integration of these two datasets allows for more accurate and reliable predictions, as it captures the necessary atmospheric conditions that favor the development of hailstorms.

&emsp; The forecasted results will be provided at a single timestamp, which is specified in the groundtruth dataset. The pipeline employs motion estimation over a sequence of 3 frames to generate predictions. In our experiment, we also account for the processing time of the Nowcast system to manage latency in data transmission. The forecasting model predicts the time at a 30-minute ahead window based on the following formula:

```
<p align="center" />Predicted time [at t] = Forecast (observed_data [from t-50 to t-30])
```

&emsp; This approach ensures that the prediction incorporates relevant historical data within the specified range, helping to maintain accuracy despite the latency introduced by the system's processing time.

Figure 4 show the AI-based forecast pipeline. 
{{< figure src="/images/weather/forecast_pipeline.png" width=70%  title="Fig 4. Forecast pipeline" >}}

</div>
<hr/>

III. Demonstration <a id="demo"></a>
-----
<div style="text-align:justify">
&emsp; <b>Figure 5 illustrates the dynamics of hail probabilities over time, highlighting accurate forecast with some deviations in the prediction precision.</b> At 14:50, the actual probability maps show isolated areas of hail activity, with probabilities mostly low, indicated by light blue shades. By 15:00, the intensity increases with spots of orange and red appearing, signaling higher probabilities. This trend continues at 15:10, with more widespread high-probability areas. The forecasted probability for 15:40 anticipates further expansion and concentration of hail activity, as shown by the larger patches of orange and red between coordinates 36.0 and 35.4 latitude and 140.0 and 139.4 longitude. The actual map at 15:40 confirms these anticipations to an extent, with a notable match in areas of highest probability, although some discrepancies in location and intensity remain evident. 

Figure 5 show forecasted result at Kanto region on 03/06/2022
{{< figure src="/images/weather/forecast_result_kanto.png" width=85%  title="Fig 5. Forecasted result at Kanto region" >}}

</div>
