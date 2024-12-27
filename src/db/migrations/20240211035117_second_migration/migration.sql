-- CreateIndex
CREATE INDEX "idx_bid_projectId" ON "Bid"("projectId");

-- CreateIndex
CREATE INDEX "idx_bid_contractorId" ON "Bid"("contractorId");

-- CreateIndex
CREATE INDEX "idx_project_owner" ON "Project"("owner");
