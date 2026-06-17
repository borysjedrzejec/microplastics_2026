const WebsitesContent = {
    'petz_homepage': {
        title: 'Petz - The Best Pets Online!',
        content: `
            <div style="text-align: center; font-family: 'Comic Sans MS', cursive;">
                <h1 style="color: #ff00ff; text-shadow: 2px 2px #00ffff;">Welcome to Petz!</h1>
                <p>Check out these cool cats!</p>
                <marquee scrollamount="5">Meow Meow Meow Meow Meow</marquee>
                <div style="border: 3px ridge #aaa; padding: 10px; margin: 10px; background: #fff;">
                    <img src="images/dancing_cat.gif" alt="Dancing Cat" style="width: 100px;">
                    <br>
                    <i>He dances!</i>
                </div>
            </div>
        `
    },

    'gov_env_2030':{
            title: 'Gov.uk - 2030 Environmental Vision',
            content: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background: #ffffff; color: #333333; line-height: 1.6;">
                    
                    <div style="border-bottom: 3px solid #000080; padding-bottom: 10px; margin-bottom: 20px;">
                        <h1 style="color: #000080; margin: 0; font-size: 24px;">Department of Energy & Environment</h1>
                        <div style="font-size: 12px; color: #666; font-weight: bold;">Official Government Portal</div>
                    </div>

                    <h2 style="font-size: 18px; color: #222;">Strategic Corporate Mandates for 2030</h2>
                    
                    <p>The government is strictly committed to transitioning the heavy industry sector towards a sustainable and transparent future. Following the recent parliamentary session, the updated regulatory framework has been established for all offshore and extraction entities.</p>
                    
                    <div style="background: #f0f8ff; border-left: 4px solid #000080; padding: 10px 15px; margin: 15px 0;">
                        <strong>Key Directives:</strong>
                        <ul style="margin-top: 10px;">
                            <li style="margin-bottom: 8px;">
                                <strong>Waste Management:</strong> We recommend a 20% reduction in single-use plastics across all offshore facilities. <em>(Note: This remains a voluntary guideline until 2035).</em>
                            </li>
                            <li style="margin-bottom: 8px;">
                                <strong>Energy Transition:</strong> To meet international climate accords, the government mandates a <strong>50% shift to renewable energy sources by 2030</strong>. This is a strict, legally binding compliance target. Failure to comply will result in severe operational fines.
                            </li>
                            <li>
                                <strong>Marine Biodiversity:</strong> A zero-tolerance policy is now in effect regarding undocumented chemical runoff in Sector 4 and 7 protected areas.
                            </li>
                        </ul>
                    </div>

                    <p style="font-size: 11px; color: #888; border-top: 1px solid #ccc; padding-top: 10px; margin-top: 30px;">
                        Last updated: May 2025 | Document Ref: GOV-ENV-2030-884A
                    </p>
                </div>
            `
    },

    'gov_tax_portal': {
            title: 'Gov.uk - Climate Change Levy',
            content: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background: #ffffff; color: #0b0c0c; line-height: 1.6;">
                    <h1 style="color: #1d70b8; border-bottom: 4px solid #1d70b8; padding-bottom: 10px; margin-top: 0;">Climate Change Levy</h1>
                    
                    <p>Climate Change Levy is paid at either, or both the:</p>
                    <ul style="margin-bottom: 20px;">
                        <li>main levy rate</li>
                        <li>Carbon Price Support rate</li>
                    </ul>
                    
                    <p>As a business energy supplier you're responsible for charging the correct levy to your customers.<br>
                    As an electricity generator you're responsible for accounting and charging the correct Carbon Price Support rate.</p>
                    
                    <p>The levy rate varies for each commodity:</p>
                    <ul style="margin-bottom: 20px;">
                        <li>kilowatt-hours (kWh) for gas and electricity</li>
                        <li>kilograms for all other taxable commodities</li>
                    </ul>
                    
                    <p style="background: #f3f2f1; padding: 15px; border-left: 5px solid #1d70b8; margin-bottom: 30px;">
                        <strong>Note:</strong> The rates do not apply to taxable commodities supplied to domestic consumers and charities for non-business use.
                    </p>

                    <h2 style="color: #1d70b8; margin-top: 30px;">Reduced rates</h2>
                    <p>There are reduced rates if you're already in the climate change agreement scheme.</p>

                    <h3 style="margin-top: 25px;">Main rates</h3>
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 14px;">
                        <thead>
                            <tr style="background: #f3f2f1;">
                                <th style="border: 1px solid #b1b4b6; padding: 10px; text-align: left;">Taxable commodity</th>
                                <th style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">From 1 April 2023</th>
                                <th style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">From 1 April 2024</th>
                                <th style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">From 1 April 2025</th>
                                <th style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">From 1 April 2026</th>
                                <th style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">From 1 April 2027</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border: 1px solid #b1b4b6; padding: 10px;">Electricity (£ per kWh)</td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">0.00775</td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">0.00775</td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">0.00775</td>
                                <td style="border: 2px solid #1d70b8; padding: 10px; text-align: center; background: #e5f5ff;"><strong>0.00801</strong></td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">0.00827</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #b1b4b6; padding: 10px;">Gas (£ per kWh)</td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">0.00672</td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">0.00775</td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">0.00775</td>
                                <td style="border: 2px solid #1d70b8; padding: 10px; text-align: center; background: #e5f5ff;"><strong>0.00801</strong></td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">0.00827</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #b1b4b6; padding: 10px;">LPG (£ per kg)</td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">0.02175</td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">0.02175</td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">0.02175</td>
                                <td style="border: 2px solid #1d70b8; padding: 10px; text-align: center; background: #e5f5ff;"><strong>0.02175</strong></td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">0.02175</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #b1b4b6; padding: 10px;">Any other taxable commodity (£ per kg)</td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">0.05258</td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">0.06064</td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">0.06064</td>
                                <td style="border: 2px solid #1d70b8; padding: 10px; text-align: center; background: #e5f5ff;"><strong>0.06264</strong></td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">0.06468</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3 style="margin-top: 25px;">Percentage discount for holders of a climate change agreement</h3>
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
                        <thead>
                            <tr style="background: #f3f2f1;">
                                <th style="border: 1px solid #b1b4b6; padding: 10px; text-align: left;">Taxable commodity</th>
                                <th style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">From 1 April 2023</th>
                                <th style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">From 1 April 2024</th>
                                <th style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">From 1 April 2025</th>
                                <th style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">From 1 April 2026</th>
                                <th style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">From 1 April 2027</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border: 1px solid #b1b4b6; padding: 10px;">Electricity</td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">92%</td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">92%</td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">92%</td>
                                <td style="border: 2px solid #1d70b8; padding: 10px; text-align: center; background: #e5f5ff;"><strong>92%</strong></td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">92%</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #b1b4b6; padding: 10px;">Gas</td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">88%</td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">89%</td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">89%</td>
                                <td style="border: 2px solid #1d70b8; padding: 10px; text-align: center; background: #e5f5ff;"><strong>89%</strong></td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">89%</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #b1b4b6; padding: 10px;">LPG</td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">77%</td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">77%</td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">77%</td>
                                <td style="border: 2px solid #1d70b8; padding: 10px; text-align: center; background: #e5f5ff;"><strong>77%</strong></td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">77%</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #b1b4b6; padding: 10px;">Any other taxable commodity</td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">88%</td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">89%</td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">89%</td>
                                <td style="border: 2px solid #1d70b8; padding: 10px; text-align: center; background: #e5f5ff;"><strong>89%</strong></td>
                                <td style="border: 1px solid #b1b4b6; padding: 10px; text-align: center;">89%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `
    },
};