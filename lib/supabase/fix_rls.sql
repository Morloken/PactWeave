-- Enable RLS
ALTER TABLE pacts ENABLE ROW LEVEL SECURITY;

-- Simplified policies using auth.uid() directly
DROP POLICY IF EXISTS "insert_pacts" ON pacts;
CREATE POLICY "insert_pacts" ON pacts FOR INSERT WITH CHECK (initiator_id = auth.uid());

DROP POLICY IF EXISTS "select_pacts" ON pacts;
CREATE POLICY "select_pacts" ON pacts FOR SELECT USING (initiator_id = auth.uid() OR counterparty_id = auth.uid());

DROP POLICY IF EXISTS "update_pacts" ON pacts;
CREATE POLICY "update_pacts" ON pacts FOR UPDATE USING (initiator_id = auth.uid() OR counterparty_id = auth.uid());

DROP POLICY IF EXISTS "delete_pacts" ON pacts;
CREATE POLICY "delete_pacts" ON pacts FOR DELETE USING (initiator_id = auth.uid());
